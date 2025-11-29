import getConnection from "../services/db.js";
// Note: Assuming 'db' is a connection pool object from the 'mysql' package.

const orderController = {


    queryAsync: async (sql, values) => {
        try {
            // mysql2/promise returns [results, fields] array
            const db = await getConnection();
            const [results] = await db.promise().query(sql, values);
            return results;
        } catch (error) {
            console.error('[queryAsync] Database error:', error.message);
            throw error;
        }
    },


    getAvailableOrders: async (req, res) => {
        console.log('[getAvailableOrders] Request received');
        try {
            const query = `
                SELECT 
                    id, 
                    COALESCE(pickup_location, 'Location not specified') AS pickup_location, 
                    shipping_address AS dropoff_location, 
                    COALESCE(weight_kg, quantity, 0) AS weight, 
                    COALESCE(product_description, 'No description') AS description,
                    order_date AS created_at, 
                    order_status
                FROM orders 
                WHERE 
                    (transporter_id IS NULL OR transporter_id = 0)
                    AND order_status = 'ready_for_pickup'
                    AND payment_status = 'paid' 
                ORDER BY order_date DESC
                LIMIT 100
            `;

            console.log('[getAvailableOrders] Executing query...');
            const orders = await orderController.queryAsync(query);
            console.log(`[getAvailableOrders] Found ${orders.length} orders`);

            return res.status(200).json({
                success: true,
                orders: orders || []
            });

        } catch (error) {
            console.error("[getAvailableOrders] Error:", error.message);
            console.error("[getAvailableOrders] SQL Error Code:", error.code);
            return res.status(500).json({
                success: false,
                error: error.message || "Server Error fetching orders"
            });
        }
    },


    // Allows the logged-in transporter to claim an order
    assignTransporter: async (req, res) => {
        const orderId = req.params.id;


        const transporterId = req.user ? req.user.id : null;

        if (!transporterId) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User ID not found."
            });
        }

        try {
            const query = `
                UPDATE orders 
                SET 
                    transporter_id = ?, 
                    order_status = 'processing' 
                WHERE 
                    id = ? 
                    AND transporter_id IS NULL
            `;

            const values = [transporterId, orderId];

            // Use the new queryAsync helper
            const result = await orderController.queryAsync(query, values);

            // mysql2/promise returns result object with affectedRows
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    error: "Order not found, already assigned, or not available."
                });
            }

            return res.status(200).json({
                success: true,
                message: "Order successfully assigned to you."
            });

        } catch (error) {
            console.error("Error assigning transporter to order:", error);
            return res.status(500).json({
                success: false,
                error: "Server Error assigning transporter to order"
            });
        }
    },

    getTransporterOrders: async (req, res) => {
        const transporterId = req.user ? req.user.id : null;

        if (!transporterId) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        try {
            const query = `
                SELECT 
                    id, 
                    COALESCE(pickup_location, 'Location not specified') AS pickup_location, 
                    shipping_address AS dropoff_location, 
                    COALESCE(weight_kg, quantity, 0) AS weight, 
                    COALESCE(product_description, 'No description') AS description,
                    order_date AS created_at, 
                    order_status,
                    payment_status
                FROM orders 
                WHERE 
                    transporter_id = ?
                ORDER BY order_date DESC
            `;

            const orders = await orderController.queryAsync(query, [transporterId]);

            return res.status(200).json({
                success: true,
                orders: orders || []
            });

        } catch (error) {
            console.error("[getTransporterOrders] Error:", error.message);
            return res.status(500).json({
                success: false,
                error: "Server Error fetching your orders"
            });
        }
    },

    createOrder: async (req, res) => {
        const { producer_id, product_id, quantity, price, shipping_address } = req.body;
        const user_id = req.user ? req.user.id : null;

        if (!user_id) {
            return res.status(401).json({ success: false, error: "Unauthorized: User ID not found." });
        }

        if (!producer_id || !product_id || !quantity || !price || !shipping_address) {
            return res.status(400).json({ success: false, error: "Missing required fields." });
        }

        try {
            // 1. Insert into orders table
            const orderQuery = `
                INSERT INTO orders (user_id, producer_id, quantity, shipping_address, payment_status, order_status, order_date)
                VALUES (?, ?, ?, ?, 'pending', 'pending', NOW())
            `;
            const orderValues = [user_id, producer_id, quantity, shipping_address];
            const orderResult = await orderController.queryAsync(orderQuery, orderValues);
            const orderId = orderResult.insertId;

            // 2. Insert into order_details table
            const subtotal = quantity * price;
            const detailsQuery = `
                INSERT INTO order_details (order_id, product_id, quantity, unit_price, subtotal)
                VALUES (?, ?, ?, ?, ?)
            `;
            const detailsValues = [orderId, product_id, quantity, price, subtotal];
            await orderController.queryAsync(detailsQuery, detailsValues);

            return res.status(201).json({
                success: true,
                message: "Order created successfully.",
                orderId: orderId
            });

        } catch (error) {
            console.error("[createOrder] Error:", error.message);
            return res.status(500).json({
                success: false,
                error: "Server Error creating order"
            });
        }
    }
};

export default orderController;
