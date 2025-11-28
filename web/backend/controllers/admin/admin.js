import express from 'express';
const router = express.Router();
import adminController from './adminController.js';
import authenticateToken from '../../middleware/AuthenticationToken.js';
import { checkRole } from '../../middleware/roles.js';

// Admin authentication routes
router.post('/login', adminController.adminLogin);
router.get('/profile', authenticateToken, checkRole('admin'), adminController.getAdminProfile);

// Dashboard routes
router.get('/dashboard/stats', authenticateToken, checkRole('admin'), adminController.getDashboardStats);

// User management routes
router.get('/users', authenticateToken, checkRole('admin'), adminController.getAllUsers);
router.put('/users/status', authenticateToken, checkRole('admin'), adminController.updateUserStatus);

// Product management routes
router.get('/products', authenticateToken, checkRole('admin'), adminController.getAllProducts);
router.put('/products/status', authenticateToken, checkRole('admin'), adminController.updateProductStatus);

// Order management routes
router.get('/orders', authenticateToken, checkRole('admin'), adminController.getAllOrders);
router.put('/orders/status', authenticateToken, checkRole('admin'), adminController.updateOrderStatus);

// Analytics routes
router.get('/analytics', authenticateToken, checkRole('admin'), adminController.getAnalytics);

export default router;