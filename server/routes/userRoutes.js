import express from 'express';
import {
  getCreatorProfile,
  getDashboardStats,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard/stats', protect, getDashboardStats);
router.get('/:handle', getCreatorProfile);

export default router;
