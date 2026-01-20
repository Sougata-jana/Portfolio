import express from 'express';
import { chatWithAI, getChatHistory } from '../controllers/aiChatController.js';

const router = express.Router();

// POST /api/ai-chat - Send message to AI
router.post('/', chatWithAI);

// GET /api/ai-chat/history/:sessionId - Get chat history
router.get('/history/:sessionId', getChatHistory);

export default router;
