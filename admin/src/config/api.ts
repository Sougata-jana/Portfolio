import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const API_ENDPOINTS = {
  // Projects
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  
  // Blogs
  BLOGS: '/api/blogs',
  BLOGS_PUBLISHED: '/api/blogs/published',
  BLOG_BY_ID: (id: string) => `/api/blogs/${id}`,
  BLOG_PUBLISH: (id: string) => `/api/blogs/${id}/publish`,
  
  // AI Chat
  AI_CHAT: '/api/ai-chat',
  AI_CHAT_HISTORY: (sessionId: string) => `/api/ai-chat/history/${sessionId}`,
};

export default api;
