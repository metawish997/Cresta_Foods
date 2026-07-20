// backend/routes/auth.js
import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register — protected: only admins can create new users
router.post('/register', [verifyToken, checkPermission('manage_users')], register);

// GET /api/auth/me — get current user info
router.get('/me', verifyToken, getMe);

export default router;
