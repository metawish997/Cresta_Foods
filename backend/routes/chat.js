// backend/routes/chat.js — Simple AI chatbot using knowledge base
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let knowledgeBase = [];
try {
  const kbPath = path.resolve(__dirname, '../knowledgeBase.json');
  if (fs.existsSync(kbPath)) {
    knowledgeBase = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
  }
} catch (e) {
  console.warn('Knowledge base not loaded:', e.message);
}

// POST /api/chat
router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Please send a message.' });

  const query = message.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const keywords = entry.keywords || [];
    let score = 0;
    for (const kw of keywords) {
      if (query.includes(kw.toLowerCase())) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return res.json({ reply: bestMatch.answer });
  }

  // Default fallback
  res.json({
    reply: "Thank you for reaching out! For specific product inquiries, please contact us at info@crestafoods.com or fill out our contact form. Our team will get back to you within 24 hours.",
  });
});

export default router;
