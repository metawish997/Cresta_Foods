// backend/routes/inquiries.js
import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { sendInquiryNotification, sendConfirmationEmail } from '../utils/mailer.js';

const router = express.Router();

// POST /api/inquiries — public: contact form submission
router.post('/', async (req, res) => {
  const { name, email, message, company, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ message: 'Invalid email address' });
  }

  try {
    const inquiry = await Inquiry.create({ name, email, company, phone, message });

    // Send emails (non-blocking — don't fail request if email fails)
    sendInquiryNotification(inquiry).catch(() => {});
    sendConfirmationEmail(inquiry).catch(() => {});

    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting inquiry', error: err.message });
  }
});

// GET all inquiries (admin)
router.get('/', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiries', error: err.message });
  }
});

// GET single inquiry (admin)
router.get('/:id', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiry', error: err.message });
  }
});

// PATCH update status (admin)
router.patch('/:id/status', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['NEW', 'CONTACTED', 'ARCHIVED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    await Inquiry.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
});

// PATCH update follow-up notes (admin)
router.patch('/:id/notes', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  try {
    await Inquiry.findByIdAndUpdate(req.params.id, { followUpNotes: req.body.notes });
    res.json({ message: 'Notes updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notes', error: err.message });
  }
});

// DELETE inquiry (admin)
router.delete('/:id', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inquiry', error: err.message });
  }
});

// POST bulk delete (admin)
router.post('/bulk-delete', [verifyToken, checkPermission('manage_inquiries')], async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ message: 'ids must be an array' });
    await Inquiry.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${ids.length} inquiries deleted` });
  } catch (err) {
    res.status(500).json({ message: 'Error bulk deleting inquiries', error: err.message });
  }
});

export default router;
