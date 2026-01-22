# Modern Portfolio - Complete Setup Guide

A full-stack MERN portfolio website with AI chat assistant, blog, and project showcase.

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - Database (Atlas Cloud)
- **OpenAI API** - AI chat assistant
- **Cloudinary** - Image hosting

### Frontend
- **React 18** with **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- OpenAI API key
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd Modern-portfolio
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

The `.env` file already exists with your credentials. Verify it contains:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection (IMPORTANT: Backend uses MONGODB_URI)
MONGODB_URI=mongodb+srv://janasougata198_db_user:portfolio321@cluster0.mrnharo.mongodb.net/portfolio?appName=Cluster0&retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=amisougata

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start Backend Server
```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

### Verify Backend
- Health check: http://localhost:5000/api/health
- Should show: `{ status: 'OK', message: 'Portfolio Backend API is running' }`

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend (in new terminal)
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

The `.env` file already exists. Verify it contains:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

### Step 4: Start Frontend Development Server
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## 🤖 AI Chat Feature

The AI assistant is powered by OpenAI's GPT-3.5-turbo model and provides information about:
- Skills & technologies
- Work experience
- Projects
- Education
- Contact information

### How It Works:
1. User sends a message via the chat interface
2. Frontend calls: `POST /api/ai-chat`
3. Backend processes with OpenAI API
4. Chat history stored in MongoDB (24-hour expiry)
5. Response returned to user

### Important Notes:
- ✅ Your OpenAI API key is already configured
- ✅ Backend uses proper environment variable names
- ✅ CORS configured for frontend communication
- ✅ Chat sessions persist with sessionStorage

---

## 📁 Project Structure

```
Modern-portfolio/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── aiChatController.js  # AI chat logic
│   │   ├── blogController.js    # Blog CRUD
│   │   └── projectController.js # Project CRUD
│   ├── models/
│   │   ├── ChatHistory.js       # Chat schema
│   │   ├── Blog.js              # Blog schema
│   │   └── Project.js           # Project schema
│   ├── routes/
│   │   ├── aiChatRoutes.js      # Chat endpoints
│   │   ├── blogRoutes.js        # Blog endpoints
│   │   └── projectRoutes.js     # Project endpoints
│   ├── .env                     # ✅ Already configured
│   ├── .env.example             # Template
│   ├── server.js                # Express app
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.tsx       # Chat interface
│   │   │   ├── Blog.tsx         # Blog list
│   │   │   ├── Projects.tsx     # Project showcase
│   │   │   ├── About.tsx        # About section
│   │   │   ├── Skills.tsx       # Skills display
│   │   │   └── ...
│   │   ├── config/
│   │   │   └── api.ts           # API endpoints (centralized)
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx # Dark/Light mode
│   │   ├── App.tsx              # Main component
│   │   └── index.tsx            # Entry point
│   ├── .env                     # ✅ Already configured
│   ├── .env.example             # Template
│   └── package.json
```

---

## 🔑 Key Fixes Applied

### Backend Issues Fixed:
1. ✅ **Environment Variable Mismatch**: Changed `MONGODB_URL` → `MONGODB_URI`
2. ✅ **Added Missing Variables**: `NODE_ENV`, `FRONTEND_URL`
3. ✅ **Proper MongoDB URI**: Added database name and connection options
4. ✅ **CORS Configuration**: Properly configured for frontend

### Frontend Issues Fixed:
1. ✅ **Hardcoded URLs Removed**: All API calls now use `API_ENDPOINTS`
2. ✅ **Environment Variables**: Created `.env` with `VITE_API_URL`
3. ✅ **Centralized API Config**: Created `src/config/api.ts`
4. ✅ **TypeScript Compatibility**: Maintained type safety throughout

---

## 🚀 Quick Start (Both Servers)

### Terminal 1 - Backend:
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Access Application:
- 🌐 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:5000
- 🤖 AI Chat: Available in portfolio (bottom-right chat icon)

---

## 🔐 Security Notes

⚠️ **IMPORTANT**: Your `.env` file contains real API keys:
- Never commit `.env` to Git (already in `.gitignore`)
- Rotate OpenAI API key if exposed publicly
- Keep MongoDB credentials secure
- Use environment variables in production

---

## 🐛 Troubleshooting

### Backend won't start:
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000
# Kill process if needed (Windows)
taskkill /PID <process_id> /F
```

### Frontend can't connect to backend:
1. Verify backend is running on port 5000
2. Check `.env` has `VITE_API_URL=http://localhost:5000`
3. Restart frontend dev server after changing `.env`

### AI Chat not working:
1. Verify OpenAI API key in backend `.env`
2. Check backend console for OpenAI errors
3. Ensure MongoDB is connected (chat history storage)
4. Check browser console for frontend errors

### MongoDB Connection Error:
1. Verify `MONGODB_URI` in backend `.env`
2. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
3. Ensure database user credentials are correct

---

## 📚 API Endpoints

### AI Chat
- `POST /api/ai-chat` - Send message to AI
- `GET /api/ai-chat/history/:sessionId` - Get chat history

### Projects (Optional - for future use)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blogs (Optional - for future use)
- `GET /api/blogs/published` - Get published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs/:id/view` - Increment views
- `POST /api/blogs/:id/like` - Toggle like

---

## 🎯 Features

✅ **AI Chat Assistant** - OpenAI-powered chat about your portfolio  
✅ **Responsive Design** - Works on all devices  
✅ **Dark/Light Mode** - Theme switcher  
✅ **Blog Section** - Article showcase (with backend ready)  
✅ **Project Showcase** - Display your work  
✅ **Skills Carousel** - Interactive skills display  
✅ **Smooth Animations** - Framer Motion powered  

---

## 📝 Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-proj-...` |
| `JWT_SECRET` | JWT signing secret | `your_secret` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

---

## 🛠️ Development

### Build Frontend for Production:
```bash
cd frontend
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

---

## 📞 Support

For issues or questions:
- Email: janasougata198@gmail.com
- GitHub: [Sougata-web](https://github.com/Sougata-web)
- LinkedIn: [sougata-jana](https://linkedin.com/in/sougata-jana)

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

---

**Made with ❤️ by Sougata Jana**
