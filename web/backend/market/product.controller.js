
import prisma from '../prisma/client.js';


export const createProduct = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;
    const { name, images, category, description, quantity_available, price } = req.body;

    if (!name || !category || !description || price === undefined) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                producer_id: producerId,
                name,
                category,
                description,
                quantity_available: parseInt(quantity_available),
                price: parseFloat(price),
                minimum_order_amount: 1,
                state: 'pending_ai',
                images: images && images.length > 0 ? {
                    create: images.map((imageUrl) => ({ image_url: imageUrl })),
                } : undefined,
            },
            include: { images: true }, 
        });

        res.status(201).json({
            message: "Product successfully published for review.",
            product: newProduct
        });
    } catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error publishing product.", error: error.message });
    }
};



export const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                
                images: true, 
                producer: { select: { id: true, fullname: true } }
            },
        });
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Prisma Error:", error);
      
        res.status(400).json({ message: "Invalid product ID or internal server error", error: error.message });
    }
};


export const getProducerProducts = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;

    try {
        const products = await prisma.product.findMany({
            where: { producer_id: producerId },
            include: {
                images: true, // Include product images
            },
            orderBy: {
                created_at: 'desc', // Order by creation date descending
            },
        });

        res.status(200).json(products);

    } catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



export const updateProduct = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;
    const productId = parseInt(req.params.id);
    const updates = req.body;

    // Filter out non-updatable fields
    delete updates.producer_id; 
    delete updates.state; 

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
            ...updates,
                state: 'pending_ai', // <-- use the correct enum value
                quantity_available: updates.quantity_available ? parseInt(updates.quantity_available) : undefined,
                price: updates.price ? parseFloat(updates.price) : undefined,
            },
        });

        res.status(200).json({
            message: "Product updated successfully. Status reset to pending for verification.",
            product: updatedProduct,
        });

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found or you don't own this product." });
        }
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error updating product.", error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;
    const productId = parseInt(req.params.id);

    try {
        await prisma.product.delete({
            where: {
                id: productId,
                producer_id: producerId, // <-- use producer_id instead of producerId
            },
        });

        res.status(200).json({ message: "Product successfully deleted." });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found or you don't own this product." });
        }
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error deleting product.", error: error.message });
    }
};
