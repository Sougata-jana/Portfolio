import OpenAI from 'openai';
import ChatHistory from '../models/ChatHistory.js';

// Initialize OpenAI only if API key is available
let openai = null;

if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('✅ OpenAI initialized successfully');
  } catch (error) {
    console.error('❌ OpenAI initialization failed:', error.message);
    openai = null;
  }
} else {
  console.warn('⚠️  OpenAI API key not configured. Using fallback responses.');
}

// Portfolio owner information - Used to train AI
const portfolioContext = `
You are an AI assistant for Sougata Jana's portfolio website.

ABOUT SOUGATA JANA:
- Full-Stack Web Developer specializing in MERN stack (MongoDB, Express.js, React.js, Node.js)
- Currently pursuing B.Tech in Computer Science and Engineering at Haldia Institute of Technology, MAKAUT (2022-2026)
- SGPA: 6.23 (Till 6th Semester)
- Email: janasougata198@gmail.com
- Phone: +91 7821808132
- GitHub: https://github.com/Sougata-web
- LinkedIn: https://linkedin.com/in/sougata-jana

EXPERIENCE:
- MERN Stack Development Intern at Zidio Technologies (April 2025 - May 2025, Remote)
  * Developed full-stack web applications using MERN stack
  * Built responsive frontend components with React.js
  * Created and tested RESTful APIs using Node.js and Express.js
  * Integrated frontend with backend services
  * Used Git for version control

SKILLS:
- Frontend: React.js, HTML, CSS, Tailwind CSS, JavaScript, TypeScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Tools: Git, Postman, VS Code
- Other: RESTful APIs, JWT Authentication, Cloudinary, Stripe Integration

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

4. Gemini AI Clone
   - AI UI clone with React.js
   - Responsive interface with dynamic UI updates

ACHIEVEMENTS:
- Participated in Hackathon 2024
- Completed Web Development Internship at Zidio Technologies
- Strong problem-solving and teamwork skills
- Passionate about continuous learning and building innovative projects

EDUCATION:
- B.Tech in Computer Science and Engineering, Haldia Institute of Technology, MAKAUT (2022-2026)
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

    // Use fallback if OpenAI is not initialized
    if (!openai) {
      const session = sessionId || `session_${Date.now()}`;
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

    // Call OpenAI API with timeout
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

    const aiResponse = completion.choices[0].message.content;

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
    return "Hello! 👋 I'm Sougata's AI assistant. I can tell you about his skills, projects, experience, education, and how to contact him. What would you like to know?";
  }

  // Skills and Technologies
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "Sougata specializes in MERN stack development - MongoDB, Express.js, React.js, and Node.js. He's also proficient in:\n\n• Frontend: React.js, HTML, CSS, Tailwind CSS, JavaScript, TypeScript\n• Backend: Node.js, Express.js\n• Database: MongoDB\n• Tools: Git, Postman, VS Code\n• Other: RESTful APIs, JWT Authentication, Cloudinary, Stripe Integration";
  }

  // Projects
  if (lowerMessage.includes('project')) {
    return "Sougata has built several impressive projects:\n\n1. **Full-Stack E-Commerce Platform** - Complete e-commerce with Stripe payments, JWT auth, and Cloudinary uploads\n\n2. **Video Streaming Platform** - Full-featured platform with video upload/playback, AI moderation, and social features\n\n3. **Personal Portfolio** - Modern responsive design with React and Tailwind CSS\n\n4. **Gemini AI Clone** - AI UI clone with dynamic updates\n\nCheck out the Projects section to see more details!";
  }

  // Experience and Internship
  if (lowerMessage.includes('experience') || lowerMessage.includes('intern') || lowerMessage.includes('work')) {
    return "Sougata completed a MERN Stack Development internship at **Zidio Technologies** (April-May 2025, Remote) where he:\n\n• Developed full-stack web applications using MERN stack\n• Built responsive frontend components with React.js\n• Created and tested RESTful APIs using Node.js and Express.js\n• Integrated frontend with backend services\n• Used Git for version control";
  }

  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('university')) {
    return "Sougata is currently pursuing **B.Tech in Computer Science and Engineering** at Haldia Institute of Technology, MAKAUT (2022-2026) with a SGPA of 6.23. He completed his Higher Secondary (Class XII) from Deshbandhubarh United High School, West Bengal with 78%.";
  }

  // Contact Information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('linkedin') || lowerMessage.includes('github')) {
    return "You can reach Sougata through:\n\n• Email: janasougata198@gmail.com\n• Phone: +91 7821808132\n• GitHub: https://github.com/Sougata-web\n• LinkedIn: https://linkedin.com/in/sougata-jana";
  }

  // About/Who is Sougata
  if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('tell me')) {
    return "Sougata Jana is a passionate Full-Stack Web Developer specializing in MERN stack. He's currently pursuing B.Tech in Computer Science and has completed an internship at Zidio Technologies. Sougata builds scalable web applications with modern technologies and has a strong portfolio of projects including e-commerce platforms and video streaming applications.";
  }

  // Achievements
  if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('hackathon')) {
    return "Sougata's achievements include:\n\n• Participated in Hackathon 2024\n• Completed Web Development Internship at Zidio Technologies\n• Built multiple production-ready full-stack applications\n• Strong problem-solving and teamwork skills\n• Passionate about continuous learning and innovation";
  }

  // Frontend specific
  if (lowerMessage.includes('frontend') || lowerMessage.includes('react')) {
    return "Sougata is proficient in frontend development with React.js, HTML, CSS, Tailwind CSS, JavaScript, and TypeScript. He builds responsive, modern user interfaces and has experience with state management, component architecture, and UI/UX best practices.";
  }

  // Backend specific
  if (lowerMessage.includes('backend') || lowerMessage.includes('node') || lowerMessage.includes('express') || lowerMessage.includes('api')) {
    return "Sougata specializes in backend development using Node.js and Express.js. He creates RESTful APIs, implements authentication with JWT, handles file uploads with Cloudinary, and integrates payment systems like Stripe. He's experienced with MongoDB for database management.";
  }

  // Database
  if (lowerMessage.includes('database') || lowerMessage.includes('mongodb')) {
    return "Sougata works with MongoDB, a NoSQL database, for building scalable applications. He's experienced in designing schemas, handling CRUD operations, and optimizing database queries for performance.";
  }

  // Default response
  return "I'm Sougata's AI assistant! I can help you learn about his skills, projects, work experience, education, and achievements. You can also ask me how to contact him. What would you like to know?";
}
