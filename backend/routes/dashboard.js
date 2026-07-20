// backend/routes/dashboard.js — Admin dashboard stats
import express from 'express';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import Inquiry from '../models/Inquiry.js';
import Product from '../models/Product.js';
import Blog from '../models/Blog.js';
import Faq from '../models/Faq.js';
import Client from '../models/Client.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/dashboard/stats (admin)
router.get('/stats', [verifyToken, checkPermission('view_dashboard')], async (req, res) => {
  try {
    const [inquiries, newInquiries, products, blogs, faqs, clients, users] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'NEW' }),
      Product.countDocuments(),
      Blog.countDocuments(),
      Faq.countDocuments(),
      Client.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({
      inquiries,
      newInquiries,
      products,
      blogs,
      faqs,
      clients,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: err.message });
  }
});

// GET /api/dashboard/recent-inquiries (admin)
router.get('/recent-inquiries', [verifyToken, checkPermission('view_dashboard')], async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message status createdAt');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent inquiries', error: err.message });
  }
});

export default router;
