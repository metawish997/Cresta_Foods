import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken, checkPermission } from '../middleware/auth.js';
import { uploadsDir } from '../config/env.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, 'company_brochure.pdf'),
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max for PDF
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

// POST /api/brochure — Upload the single brochure PDF (Admin only)
// Note: We aren't checking specific permission strings here beyond being a logged-in admin,
// but we can enforce checkPermission('manage_pages') or similar if needed.
// For now, any admin can upload.
router.post('/', [verifyToken, upload.single('pdf')], (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file provided' });
    }
    res.json({ message: 'Brochure uploaded successfully', filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading brochure', error: err.message });
  }
});

// GET /api/brochure/download — Download the brochure PDF (Public)
router.get('/download', (req, res) => {
  const filePath = path.join(uploadsDir, 'company_brochure.pdf');
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'Cresta_Foods_Brochure.pdf');
  } else {
    res.status(404).send('Brochure not found on server.');
  }
});

// GET /api/brochure/preview — Preview the brochure PDF inline
router.get('/preview', (req, res) => {
  const filePath = path.join(uploadsDir, 'company_brochure.pdf');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Brochure not found on server.');
  }
});

export default router;
