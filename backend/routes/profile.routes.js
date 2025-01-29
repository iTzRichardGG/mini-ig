import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';

const router = Router();

router.get('/profile', verifyToken, getProfile);
router.put('/updateProfile', verifyToken, updateProfile);

export default router;