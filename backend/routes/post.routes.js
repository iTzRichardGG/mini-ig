import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createPost, getPosts, likePost, getLikes, commentPost, getComments } from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post', verifyToken, createPost);
router.get('/posts', getPosts);
router.post('/posts/:postId/like', verifyToken, likePost);
router.get('/posts/:postId/likes', getLikes); 
router.post('/posts/:postId/comment', verifyToken, commentPost);
router.get('/posts/:postId/comments', getComments);

export default router;