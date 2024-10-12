import express from 'express';
import postController from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware.protect, postController.createPost);

export default router;
