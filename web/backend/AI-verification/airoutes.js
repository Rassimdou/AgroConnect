import express from 'express';
const router = express.Router();
import aiController from './AI-verificationController.js';
import authenticateToken from '../middleware/AuthenticationToken.js';
import { checkRole } from '../middleware/roles.js';

router.post('/validate/product', aiController.validate_product);

export default router;