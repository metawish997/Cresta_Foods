// backend/index.js — Express server entry point
import './loadEnv.js';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import connectDB from './config/db.js';
import { uploadsDir } from './config/env.js';
import { initIO } from './utils/socket.js';

// Routes
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import rolesRoutes from './routes/roles.js';
import heroSlidesRoutes from './routes/heroSlides.js';
import productsRoutes from './routes/products.js';
import blogsRoutes from './routes/blogs.js';
import inquiriesRoutes from './routes/inquiries.js';
import pageContentRoutes from './routes/pageContent.js';
import seoRoutes from './routes/seo.js';
import statisticsRoutes from './routes/statistics.js';
import faqsRoutes from './routes/faqs.js';
import clientsRoutes from './routes/clients.js';
import certificationsRoutes from './routes/certifications.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';
import dashboardRoutes from './routes/dashboard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
initIO(httpServer);

// ─── Port setup ────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/hero-slides', heroSlidesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/page-content', pageContentRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/certifications', certificationsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cresta Foods API is running', timestamp: new Date().toISOString() });
});

// ─── Serve Frontend Static Files & Fallback ───────────────────────────────────
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('{/*splat}', (req, res) => {
//   const indexPath = path.join(__dirname, 'public', 'index.html');
//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath);
//   } else {
//     res.send('API Server Running... (Frontend build files not found in public/)');
//   }
// });

// ─── Serve Frontend Static Files & Fallback ───────────────────────────────────
// 1. Static files public/dist se serve hongi
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// 2. Fallback route index.html (public/dist/index.html) ko serve karega
app.get('{/*splat}', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('API Server Running... (Frontend build files not found in public/dist/)');
  }
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// ─── Start Server & Connect DB Safe Manner ────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();
    console.log('>>> MongoDB Connected Successfully');
  } catch (dbErr) {
    console.error('>>> MongoDB Connection Error:', dbErr.message);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> Cresta Foods API running on port ${PORT}`);
  });
};

startServer();
