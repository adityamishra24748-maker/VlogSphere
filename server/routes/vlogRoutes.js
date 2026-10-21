import express from 'express';
import {
  getVlogs,
  getVlogById,
  createVlog,
  deleteVlog,
  toggleLikeVlog,
  addComment,
} from '../controllers/vlogController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getVlogs)
  .post(
    protect,
    upload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    createVlog
  );

router.route('/:id')
  .get(getVlogById)
  .delete(protect, deleteVlog);

router.post('/:id/like', protect, toggleLikeVlog);
router.post('/:id/comments', protect, addComment);

export default router;
