import express from 'express';
import {
  toggleSubscription,
  getSubscribedChannels,
  getChannelSubscribers,
} from '../controllers/subscriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:channelId/toggle', protect, toggleSubscription);
router.get('/channels', protect, getSubscribedChannels);
router.get('/subscribers/:channelId', getChannelSubscribers);

export default router;
