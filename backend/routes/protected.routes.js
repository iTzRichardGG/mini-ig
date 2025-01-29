import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken, (req, res) => {
    try {
        res.json({ message: 'This is a protected route', userId: req.userId });
    } catch (error) {
        console.error('Error fetching protected data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;