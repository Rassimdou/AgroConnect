import express from 'express';
import { getUserConversations } from './chat.service.js';
import authenticateToken from '../middleware/AuthenticationToken.js';

const router = express.Router();

router.get('/conversations', authenticateToken, async (req, res) => {
    try {
        // authenticateToken middleware attaches the user object to req.user
        // It handles both 'user' and 'producer' roles, but the structure might vary slightly
        // based on how your token is signed.
        // Assuming req.user contains { id, role }

        const userId = req.user.id;
        const userRole = req.user.role; // 'user', 'producer', 'transporter'

        if (!userId || !userRole) {
            return res.status(400).json({ error: 'User ID or Role missing from token.' });
        }

        const conversations = await getUserConversations(userId, userRole);
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
