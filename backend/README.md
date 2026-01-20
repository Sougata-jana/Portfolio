# Portfolio Backend API

Complete backend API for portfolio website with AI chat, blog management, and project management.

## 🚀 Features

- **AI Chat** - Intelligent chatbot that answers questions about your portfolio using OpenAI
- **Blog Management** - CRUD operations for blog posts
- **Project Management** - Add, update, delete projects
- **MongoDB Database** - Persistent data storage
- **RESTful API** - Clean and organized API endpoints

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key (optional - fallback responses available)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables in .env:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   OPENAI_API_KEY=your_openai_api_key
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB** (if using local MongoDB):
   ```bash
   mongod
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### AI Chat
- `POST /api/ai-chat` - Send message to AI
- `GET /api/ai-chat/history/:sessionId` - Get chat history

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/published` - Get published blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs/:id/view` - Increment blog views
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Health Check
- `GET /api/health` - Check API status

## 📝 Example API Requests

### AI Chat
```javascript
POST /api/ai-chat
{
  "message": "What are Sougata's skills?",
  "sessionId": "session_123"
}
```

### Create Project
```javascript
POST /api/projects
{
  "title": "My Awesome Project",
  "description": "A full-stack web application",
  "category": "Full-Stack",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project-demo.com",
  "featured": true
}
```

### Create Blog
```javascript
POST /api/blogs
{
  "title": "Getting Started with MERN Stack",
  "content": "Full blog content here...",
  "excerpt": "Learn MERN stack basics",
  "category": "Web Development",
  "tags": ["MERN", "JavaScript", "Tutorial"],
  "published": true
}
```

## 🔑 Getting OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Add it to your `.env` file

**Note:** If you don't add an OpenAI key, the API will use fallback responses.

## 📂 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── aiChatController.js  # AI chat logic
│   ├── projectController.js # Project CRUD
│   └── blogController.js    # Blog CRUD
├── models/
│   ├── Project.js          # Project schema
│   ├── Blog.js             # Blog schema
│   └── ChatHistory.js      # Chat history schema
├── routes/
│   ├── aiChatRoutes.js     # AI chat routes
│   ├── projectRoutes.js    # Project routes
│   └── blogRoutes.js       # Blog routes
├── .env.example
├── .gitignore
├── package.json
├── server.js               # Main server file
└── README.md
```

## 🧪 Testing

Test the API using:
- **Postman** - Import endpoints and test
- **Thunder Client** (VS Code extension)
- **curl** commands

Example:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects
```

## 🌐 Connecting Frontend

Update your frontend API calls to point to `http://localhost:5000/api`

## 📄 License

ISC License

## 👤 Author

**Sougata Jana**
- GitHub: [@Sougata-web](https://github.com/Sougata-web)
- LinkedIn: [sougata-jana](https://linkedin.com/in/sougata-jana)
- Email: janasougata198@gmail.com
