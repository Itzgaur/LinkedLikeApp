import express from 'express';

import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/suggestConnections',
  authMiddleware.protect,
  userController.getSuggestedConnections
);

router.get('/:username', authMiddleware.protect, userController.getProfile);

router.get(
  '/getUsers',
  authMiddleware.protect,
  authMiddleware.checkRoles,
  (req, res, next) => {
    res.send(`getUsers`);
  }
);

export default router;
