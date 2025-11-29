import express from 'express';
import orderController from './order.Controller.js';
import authenticateToken from '../middleware/AuthenticationToken.js';
const router = express.Router();


router.get('/availables', orderController.getAvailableOrders);


router.post('/:id/assign', authenticateToken, orderController.assignTransporter);



router.post('/create', authenticateToken, orderController.createOrder);

router.get('/my-deliveries', authenticateToken, orderController.getTransporterOrders);

export default router;