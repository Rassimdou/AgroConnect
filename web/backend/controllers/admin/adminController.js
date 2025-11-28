import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login successful',
            admin: {
                id: admin.id,
                fullname: admin.fullname,
                email: admin.email
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get admin profile
export const getAdminProfile = async (req, res) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                fullname: true,
                email: true,
                created_at: true
            }
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json(admin);
    } catch (error) {
        console.error('Get admin profile error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalProducers, totalTransporters, totalProducts, totalOrders, revenueStats] = await Promise.all([
            prisma.user.count(),
            prisma.producer.count(),
            prisma.transporter.count(),
            prisma.product.count(),
            prisma.order.count(),
            prisma.order.aggregate({
                _sum: {
                    quantity: true
                },
                where: {
                    payment_status: 'paid'
                }
            })
        ]);

        // Get recent orders
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { order_date: 'desc' },
            include: {
                user: { select: { fullname: true } },
                producer: { select: { fullname: true } }
            }
        });

        // Get pending products for approval
        const pendingProducts = await prisma.product.count({
            where: { state: 'pending_ai' }
        });

        // Get reported items
        const pendingReports = await prisma.report.count({
            where: { status: 'pending' }
        });

        res.json({
            overview: {
                totalUsers,
                totalProducers,
                totalTransporters,
                totalProducts,
                totalOrders,
                totalRevenue: revenueStats._sum.quantity || 0,
                pendingProducts,
                pendingReports
            },
            recentOrders,
            systemHealth: {
                status: 'healthy',
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users with filters
export const getAllUsers = async (req, res) => {
    try {
        const { type, status, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        let where = {};
        if (status) {
            where.verified_status = status;
        }

        let users = [];
        let total = 0;

        if (!type || type === 'user') {
            const userData = await prisma.user.findMany({
                where,
                skip,
                take: parseInt(limit),
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    phone_number: true,
                    verified_status: true,
                    created_at: true
                },
                orderBy: { created_at: 'desc' }
            });
            users = userData.map(user => ({ ...user, type: 'user' }));
            total = await prisma.user.count({ where });
        } else if (type === 'producer') {
            const producerData = await prisma.producer.findMany({
                where,
                skip,
                take: parseInt(limit),
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    phone_number: true,
                    location: true,
                    verified_status: true,
                    created_at: true
                },
                orderBy: { joined_at: 'desc' }
            });
            users = producerData.map(user => ({ ...user, type: 'producer' }));
            total = await prisma.producer.count({ where });
        } else if (type === 'transporter') {
            const transporterData = await prisma.transporter.findMany({
                where,
                skip,
                take: parseInt(limit),
                select: {
                    id: true,
                    fullname: true,
                    email: true,
                    phone_number: true,
                    location: true,
                    verified_status: true,
                    created_at: true
                },
                orderBy: { joined_at: 'desc' }
            });
            users = transporterData.map(user => ({ ...user, type: 'transporter' }));
            total = await prisma.transporter.count({ where });
        }

        res.json({
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update user status (ban/suspend/verify)
export const updateUserStatus = async (req, res) => {
    try {
        const { userId, userType, action } = req.body;

        let model, statusField;
        switch (userType) {
            case 'user':
                model = prisma.user;
                statusField = 'verified_status';
                break;
            case 'producer':
            case 'transporter':
                model = userType === 'producer' ? prisma.producer : prisma.transporter;
                statusField = 'verified_status';
                break;
            default:
                return res.status(400).json({ message: 'Invalid user type' });
        }

        let newStatus;
        switch (action) {
            case 'verify':
                newStatus = 'verified';
                break;
            case 'ban':
                newStatus = 'banned';
                break;
            case 'unban':
                newStatus = 'unverified';
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        const updatedUser = await model.update({
            where: { id: parseInt(userId) },
            data: { [statusField]: newStatus },
            select: {
                id: true,
                fullname: true,
                email: true,
                [statusField]: true
            }
        });

        res.json({
            message: `User ${action}ed successfully`,
            user: updatedUser
        });
    } catch (error) {
        console.error('Update user status error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        let where = {};
        if (status) {
            where.state = status;
        }

        const products = await prisma.product.findMany({
            where,
            skip,
            take: parseInt(limit),
            include: {
                producer: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        verified_status: true
                    }
                },
                images: {
                    where: { is_primary: true },
                    select: { image_url: true }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        const total = await prisma.product.count({ where });

        res.json({
            products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update product status
export const updateProductStatus = async (req, res) => {
    try {
        const { productId, action } = req.body;

        let newState;
        switch (action) {
            case 'approve':
                newState = 'approved_by_ai';
                break;
            case 'reject':
                newState = 'revoked_by_ai';
                break;
            case 'pending':
                newState = 'pending_ai';
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(productId) },
            data: { state: newState },
            include: {
                producer: {
                    select: {
                        fullname: true,
                        email: true
                    }
                }
            }
        });

        res.json({
            message: `Product ${action}d successfully`,
            product: updatedProduct
        });
    } catch (error) {
        console.error('Update product status error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        let where = {};
        if (status) {
            where.order_status = status;
        }

        const orders = await prisma.order.findMany({
            where,
            skip,
            take: parseInt(limit),
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true
                    }
                },
                producer: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true
                    }
                },
                order_details: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price: true
                            }
                        }
                    }
                }
            },
            orderBy: { order_date: 'desc' }
        });

        const total = await prisma.order.count({ where });

        res.json({
            orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const validStatuses = ['pending', 'processing', 'ready_for_pickup', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: { order_status: status },
            include: {
                user: { select: { fullname: true, email: true } },
                producer: { select: { fullname: true, email: true } }
            }
        });

        res.json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
    try {
        const { period = '30' } = req.query;
        const days = parseInt(period);

        // User growth over time
        const userGrowth = await prisma.$queryRaw`
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM users
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
            GROUP BY DATE(created_at)
            ORDER BY date
        `;

        // Product categories distribution
        const productCategories = await prisma.product.groupBy({
            by: ['category'],
            _count: { category: true },
            where: {
                category: { not: null }
            }
        });

        // Transaction volume
        const transactionVolume = await prisma.$queryRaw`
            SELECT DATE(order_date) as date, COUNT(*) as orders, SUM(quantity) as volume
            FROM orders
            WHERE order_date >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
            AND payment_status = 'paid'
            GROUP BY DATE(order_date)
            ORDER BY date
        `;

        res.json({
            userGrowth,
            productCategories,
            transactionVolume
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};