import express from 'express';
const router = express.Router();
import reviwewController from '../review/reviewController.js';
import authenticateToken from '../middleware/AuthenticationToken.js';
import { checkRole } from '../middleware/roles.js';

router.post('/give', reviwewController.giveReview);
router.get('/getreviews/:target_id/:target_type', reviwewController.getReviews);

export default router;
