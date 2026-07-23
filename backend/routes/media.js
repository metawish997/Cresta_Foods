import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getAllMedia, getPublicMedia, toggleMediaStatus, deleteMedia } from '../controllers/mediaController.js';

const router = express.Router();

// Public route for frontend gallery
router.get('/public', getPublicMedia);

// All other media routes are protected and require admin privileges
router.use(verifyToken);

router.get('/', getAllMedia);
router.put('/:id/toggle-status', toggleMediaStatus);
router.delete('/:id', deleteMedia);

export default router;
