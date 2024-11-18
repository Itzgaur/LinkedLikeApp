import express from 'express';
import postController from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware.protect, postController.getFeedPosts);
router.post('/create', authMiddleware.protect, postController.createPost);
router.delete(
  '/deletePost/:postId',
  authMiddleware.protect,
  postController.deletePost
);
router.post('/:id/like', authMiddleware.protect, postController.likePost);
router.post(
  '/:id/comment',
  authMiddleware.protect,
  postController.createComment
);
export default router;
