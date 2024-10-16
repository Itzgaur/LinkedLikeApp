import express from 'express';
import notificationController from '../controllers/notificationController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware.protect,
  notificationController.getUserNotifications
);

export default router;
