import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import connectionController from '../controllers/connectionController.js';

const router = express.Router();

router.post(
  '/request/:userId',
  authMiddleware.protect,
  connectionController.sendConnectionRequest
);
router.get(
  '/',
  authMiddleware.protect,
  connectionController.getUserConnections
);

export default router;
