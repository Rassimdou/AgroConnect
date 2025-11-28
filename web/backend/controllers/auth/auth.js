import express from 'express';
const router = express.Router();
import authController from '../../controllers/auth/authcontroller.js';
import authenticateToken from '../../middleware/AuthenticationToken.js';
import { checkRole } from '../../middleware/roles.js';


router.post('/register/user', authController.registernewUser);
router.post('/register/producer', authController.registerNewProducer);
router.post('/register/transporter', authController.registerNewTransporter);
router.post('/login/user', authController.loginUsers);
router.post('/login/producer', authController.loginproducers);
router.post('/login/transporter', authController.logintransporters);
router.post('/verify/otp', authController.verifyOTP);
router.get('/profile/user', authenticateToken, checkRole('user'), authController.getuserProfile);
router.get('/profile/producer/:id', authenticateToken, authController.getproducerProfile);
router.get('/profile/producer', authenticateToken, checkRole('producer'), authController.getproducerProfile);
router.get('/profile/transporter', authenticateToken, checkRole('transporter'), authController.gettransporterProfile);

router.post('/logout', authController.logout);

export default router;