import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import aiChatRoutes from './routes/aiChatRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ? [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'https://sougata-portfolio-kappa.vercel.app', // Production backend
    'http://localhost:5173', // Local frontend
    'http://localhost:5174', // Admin panel
    'http://localhost:5175', // Alternative admin port
    'http://localhost:5176', // Admin panel (current)
    'http://localhost:5177', // Alternative admin port
    'http://localhost:5178'  // Alternative admin port
  ].filter(Boolean) : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Root route - API welcome
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    author: 'Sougata Jana',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      blogs: '/api/blogs/published',
      aiChat: '/api/ai-chat'
    },
    documentation: 'https://github.com/Sougata-Jana/Portfolio',
    status: 'Server is running successfully ✅'
  });
});

// Routes
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Connected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server (only in non-Vercel environment)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 API: http://localhost:${PORT}/api`);
  });
}

export default app;
