// API Configuration
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // AI Chat
  AI_CHAT: `${API_BASE_URL}/api/ai-chat`,
  AI_CHAT_HISTORY: (sessionId: string) => `${API_BASE_URL}/api/ai-chat/history/${sessionId}`,
  
  // Projects
  PROJECTS: `${API_BASE_URL}/api/projects`,
  PROJECT_BY_ID: (id: string) => `${API_BASE_URL}/api/projects/${id}`,
  
  // Blogs
  BLOGS_PUBLISHED: `${API_BASE_URL}/api/blogs/published`,
  BLOG_BY_ID: (id: string) => `${API_BASE_URL}/api/blogs/${id}`,
  BLOG_VIEW: (id: string) => `${API_BASE_URL}/api/blogs/${id}/view`,
  BLOG_LIKE: (id: string) => `${API_BASE_URL}/api/blogs/${id}/like`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
