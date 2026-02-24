import OpenAI from 'openai';
import ChatHistory from '../models/ChatHistory.js';

// Initialize OpenAI only if API key is available
let openai = null;
let openaiAvailable = false;

if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    openaiAvailable = true;
    console.log('✅ OpenAI initialized successfully');
  } catch (error) {
    console.error('❌ OpenAI initialization failed:', error.message);
    openai = null;
    openaiAvailable = false;
  }
} else {
  console.warn('⚠️  OpenAI API key not configured. Using fallback responses.');
}

// Portfolio owner information - Used to train AI
const portfolioContext = `
You are an AI assistant for Sougata Jana's portfolio website.

ABOUT SOUGATA JANA:
- Full-Stack Web Developer specializing in MERN stack (MongoDB, Express.js, React.js, Node.js)
- Currently pursuing B.Tech in Computer Science and Engineering at Sanaka Educational Trust's Group of Institutions, MAKAUT (2022-2026)
- SGPA: 7.67 (Till 7th Semester)
- Email: janasougata198@gmail.com
- Phone: +91 7821808132
- GitHub: https://github.com/Sougata-web
- LinkedIn: https://linkedin.com/in/sougata-jana

EXPERIENCE:
- MERN Stack Development Intern at Zidio Technologies (April 2025 - May 2025, Remote)
  * Developed full-stack web applications using MERN stack
  * Built responsive frontend components with React.js
  * Created and tested RESTful APIs using Node.js and Express.js
  * Integrated frontend with backend services and performed API testing using Postman
  * Used Git for version control and followed collaborative development workflows

SKILLS:
- Frontend: React.js, Next.js, TypeScript, HTML, CSS, Tailwind CSS, JavaScript, Framer Motion, Redux
- Backend: Node.js, Express.js, RESTful APIs, GraphQL, JWT, WebSockets
- Database: MongoDB, PostgreSQL, MySQL, Redis, Mongoose, Prisma
- DevOps & Cloud: AWS, Docker, GitHub Actions, Vercel, Netlify, CI/CD
- Tools: Git, Postman, VS Code

PROJECTS:
1. Full-Stack E-Commerce Platform
   - Complete e-commerce with React frontend and admin dashboard
   - Backend: Node.js, Express.js, MongoDB
   - Features: Stripe payments, JWT authentication, Cloudinary uploads, order tracking
   - Tech: React, Node.js, Express, MongoDB, Stripe

2. Video Streaming Platform
   - Full-featured video sharing platform
   - Features: Video upload/playback, likes, comments, bookmarks, playlists
   - AI content moderation, JWT auth with OTP
   - Tech: React, Node.js, MongoDB, Cloudinary, JWT

3. Personal Portfolio
   - Modern portfolio with React.js and Tailwind CSS
   - Responsive design showcasing projects and skills
   - Features: AI chat assistant, admin panel, blog system

4. Gemini AI Clone
   - AI UI clone with React.js
   - Responsive interface with dynamic UI updates

ACHIEVEMENTS:
- Participated in Hackathon 2024
- Completed Web Development Internship at Zidio Technologies
- Strong problem-solving and teamwork skills
- Passionate about continuous learning and building innovative projects

EDUCATION:
- B.Tech in Computer Science and Engineering, Sanaka Educational Trust's Group of Institutions, MAKAUT (2022-2026), SGPA: 7.67 (Till 7th Semester)
- Higher Secondary (Class XII), Deshdattabarh United High School (HS), West Bengal, India, 78%
- Higher Secondary (Class XII), Deshbandhubarh United High School, West Bengal (78%)

Answer questions about Sougata's skills, experience, projects, and background in a friendly, professional manner.
If asked about something not in this context, politely say you can help with information about Sougata's portfolio.
`;

// Chat with AI
export const chatWithAI = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Use fallback if OpenAI is not initialized or not available
    if (!openai || !openaiAvailable) {
      const session = sessionId || `session_${Date.now()}`;
      console.log('ℹ️  Using fallback response for:', message.substring(0, 50));
      return res.json({
        success: true,
        message: getFallbackResponse(message),
        sessionId: session,
        usedFallback: true
      });
    }

    // Get or create chat history
    const session = sessionId || `session_${Date.now()}`;
    let chatHistory = await ChatHistory.findOne({ sessionId: session });

    if (!chatHistory) {
      chatHistory = new ChatHistory({
        sessionId: session,
        messages: []
      });
    }

    // Add user message to history
    chatHistory.messages.push({
      role: 'user',
      content: message
    });

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: portfolioContext },
      ...chatHistory.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI API with timeout and better error handling
    let aiResponse;
    try {
      const completion = await Promise.race([
        openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('OpenAI request timeout')), 30000)
        )
      ]);

      aiResponse = completion.choices[0].message.content;
    } catch (apiError) {
      // If OpenAI API call fails, use fallback immediately
      console.log('⚠️  OpenAI API call failed, using fallback:', apiError.message);
      return res.json({
        success: true,
        message: getFallbackResponse(message),
        sessionId: session,
        usedFallback: true
      });
    }

    // Add AI response to history
    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chatHistory.save();

    res.json({
      success: true,
      message: aiResponse,
      sessionId: session
    });

  } catch (error) {
    console.error('AI Chat Error:', error.message || error);
    
    // Use fallback for all OpenAI errors (quota, rate limit, timeout, etc)
    if (error.status === 429 || 
        error.code === 'insufficient_quota' || 
        error.message?.includes('timeout') ||
        error.message?.includes('quota') ||
        error.message?.includes('rate_limit')) {
      console.log('⚠️  OpenAI error, using fallback response:', error.message);
      return res.json({
        success: true,
        message: getFallbackResponse(message),
        sessionId: sessionId || `session_${Date.now()}`,
        usedFallback: true
      });
    }
    
    // For other errors, still provide fallback instead of failing
    console.log('⚠️  Unexpected error, using fallback response');
    return res.json({
      success: true,
      message: getFallbackResponse(message),
      sessionId: sessionId || `session_${Date.now()}`,
      usedFallback: true
    });
  }
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatHistory = await ChatHistory.findOne({ sessionId });

    if (!chatHistory) {
      return res.status(404).json({
        success: false,
        message: 'Chat history not found'
      });
    }

    res.json({
      success: true,
      data: chatHistory.messages
    });

  } catch (error) {
    console.error('Get Chat History Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat history',
      error: error.message
    });
  }
};

// Fallback responses (used when OpenAI API key is not set or quota exceeded)
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    return "👋 Hello! I'm Sougata's AI assistant.\n\nI can help you learn about:\n▹ Technical Skills & Stack\n▹ Featured Projects\n▹ Work Experience\n▹ Education & Achievements\n▹ Contact Information\n\nWhat would you like to know?";
  }

  // Skills and Technologies
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "💻 **Sougata's Technical Skills:**\n\n**Frontend Development:**\n▹ React.js, Next.js, TypeScript\n▹ HTML5, CSS3, Tailwind CSS\n▹ Framer Motion, Redux\n\n**Backend Development:**\n▹ Node.js, Express.js\n▹ RESTful APIs, GraphQL\n▹ JWT Authentication, WebSockets\n\n**Database:**\n▹ MongoDB, PostgreSQL, MySQL\n▹ Mongoose, Prisma, Redis\n\n**DevOps & Cloud:**\n▹ AWS, Docker, Vercel, Netlify\n▹ GitHub Actions, CI/CD";
  }

  // Projects
  if (lowerMessage.includes('project')) {
    return "🚀 **Featured Projects:**\n\n**1. Full-Stack E-Commerce Platform**\n▹ Complete shopping experience with Stripe payments\n▹ JWT authentication & Cloudinary uploads\n▹ Tech: React, Node.js, Express, MongoDB\n\n**2. Video Streaming Platform**\n▹ Video upload/playback with social features\n▹ AI content moderation & JWT auth\n▹ Tech: React, Node.js, MongoDB, Cloudinary\n\n**3. Personal Portfolio**\n▹ Modern responsive design\n▹ Tech: React.js, Tailwind CSS\n\n**4. Gemini AI Clone**\n▹ AI UI with dynamic updates\n▹ Tech: React.js\n\nCheck out the Projects section for more details!";
  }

  // Experience and Internship
  if (lowerMessage.includes('experience') || lowerMessage.includes('intern') || lowerMessage.includes('work')) {
    return "💼 **Work Experience:**\n\n**MERN Stack Development Intern**\nZidio Technologies • Remote\nApril 2025 - May 2025\n\n**Key Achievements:**\n▹ Developed full-stack web applications using MERN stack\n▹ Built responsive frontend components with React.js\n▹ Created and tested RESTful APIs using Node.js\n▹ Integrated frontend with backend services\n▹ Implemented Git version control workflows";
  }

  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('university')) {
    return "🎓 **Education:**\n\n**B.Tech in Computer Science and Engineering**\nSanaka Educational Trust's Group of Institutions, MAKAUT\n2022 - 2026 • SGPA: 7.67 (Till 7th Semester)\n\n**Higher Secondary (Class XII)**\nDeshdattabarh United High School (HS)\nWest Bengal, India • 78%";
  }

  // Contact Information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('linkedin') || lowerMessage.includes('github')) {
    return "📧 **Get in Touch:**\n\n**Email:**\njanasougata198@gmail.com\n\n**Phone:**\n+91 7821808132\n\n**GitHub:**\nhttps://github.com/Sougata-web\n\n**LinkedIn:**\nhttps://linkedin.com/in/sougata-jana\n\nFeel free to reach out for collaborations or opportunities!";
  }

  // About/Who is Sougata
  if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('tell me')) {
    return "👨‍💻 **About Sougata Jana:**\n\nSougata is a passionate **Full-Stack Web Developer** specializing in MERN stack development.\n\n**Current Status:**\n▹ B.Tech Student in Computer Science at Sanaka Educational Trust's Group of Institutions, MAKAUT\n▹ SGPA: 7.67 (Till 7th Semester)\n▹ Completed internship at Zidio Technologies\n▹ Building innovative full-stack applications\n\n**Expertise:**\n▹ MongoDB, Express.js, React.js, Node.js\n▹ Modern web technologies & cloud services\n▹ Scalable application architecture\n\n**Focus:**\nCreating beautiful, functional web applications with clean code and best practices.";
  }

  // Achievements
  if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('hackathon')) {
    return "🏆 **Achievements & Highlights:**\n\n**Hackathon 2024**\n▹ Participated in collaborative problem-solving\n▹ Built innovative solutions under time constraints\n\n**Internship Success**\n▹ Completed MERN Stack internship at Zidio Technologies\n▹ Hands-on experience with production applications\n\n**Project Portfolio**\n▹ Multiple production-ready full-stack applications\n▹ Passionate about continuous learning\n▹ Strong problem-solving and teamwork skills";
  }

  // Frontend specific
  if (lowerMessage.includes('frontend') || lowerMessage.includes('react')) {
    return "🎨 **Frontend Expertise:**\n\n**Core Technologies:**\n▹ React.js with Hooks & Context API\n▹ TypeScript for type safety\n▹ Tailwind CSS for modern styling\n\n**Advanced Skills:**\n▹ Framer Motion for animations\n▹ Redux for state management\n▹ Responsive design principles\n▹ Component architecture\n▹ UI/UX best practices\n\nBuilding beautiful, performant user interfaces!";
  }

  // Backend specific
  if (lowerMessage.includes('backend') || lowerMessage.includes('node') || lowerMessage.includes('express') || lowerMessage.includes('api')) {
    return "⚙️ **Backend Development:**\n\n**Technologies:**\n▹ Node.js & Express.js\n▹ RESTful API design\n▹ GraphQL implementation\n\n**Key Skills:**\n▹ JWT Authentication\n▹ File uploads with Cloudinary\n▹ Payment integration (Stripe)\n▹ WebSocket real-time features\n▹ MongoDB database management\n\nCreating robust, scalable backend systems!";
  }

  // Database
  if (lowerMessage.includes('database') || lowerMessage.includes('mongodb')) {
    return "🗄️ **Database Expertise:**\n\n**Primary Database:**\nMongoDB (NoSQL)\n\n**Skills:**\n▹ Schema design & optimization\n▹ CRUD operations\n▹ Query optimization\n▹ Aggregation pipelines\n▹ Mongoose ODM\n\n**Also familiar with:**\n▹ PostgreSQL, MySQL (SQL)\n▹ Redis for caching\n▹ Prisma ORM";
  }

  // Default response
  return "🤖 I'm here to help!\n\n**Ask me about:**\n▹ Technical Skills & Technologies\n▹ Projects & Portfolio\n▹ Work Experience\n▹ Education & Achievements\n▹ How to Contact Sougata\n\nWhat would you like to know?";
}
