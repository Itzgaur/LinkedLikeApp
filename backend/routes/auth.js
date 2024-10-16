import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authMiddleware.protect, authController.logout);

router.get('/me', authMiddleware.protect, authController.getCurrentUser);
export default router;
