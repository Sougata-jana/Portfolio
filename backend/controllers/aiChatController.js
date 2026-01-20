import OpenAI from 'openai';
import ChatHistory from '../models/ChatHistory.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

    if (!process.env.OPENAI_API_KEY) {
      // Fallback response if OpenAI key is not set
      return res.json({
        success: true,
        message: getFallbackResponse(message)
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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

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
    console.error('AI Chat Error:', error);
    
    // If OpenAI fails (quota, rate limit, etc), use fallback response
    if (error.status === 429 || error.code === 'insufficient_quota') {
      console.log('⚠️  OpenAI quota exceeded, using fallback response');
      return res.json({
        success: true,
        message: getFallbackResponse(message),
        sessionId: sessionId || `session_${Date.now()}`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error processing your message',
      error: error.message
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

// Fallback responses (used when OpenAI API key is not set)
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return "Sougata specializes in MERN stack development - MongoDB, Express.js, React.js, and Node.js. He's also proficient in Tailwind CSS, JWT authentication, and tools like Git and Postman.";
  }

  if (lowerMessage.includes('project')) {
    return "Sougata has built several impressive projects including a Full-Stack E-Commerce Platform with Stripe payments, a Video Streaming Platform with AI moderation, and a modern portfolio website. Check out the Projects section to see more!";
  }

  if (lowerMessage.includes('experience') || lowerMessage.includes('intern')) {
    return "Sougata completed a MERN Stack Development internship at Zidio Technologies (April-May 2025) where he built full-stack applications, created RESTful APIs, and worked with modern development tools.";
  }

  if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
    return "Sougata is currently pursuing B.Tech in Computer Science and Engineering at Haldia Institute of Technology, MAKAUT (2022-2026) with a SGPA of 6.23.";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return "You can reach Sougata via email at janasougata198@gmail.com or call +91 7821808132. He's also active on GitHub (Sougata-web) and LinkedIn.";
  }

  return "Sougata is a passionate Full-Stack Developer specializing in MERN stack. He builds scalable web applications with modern technologies. Feel free to ask about his skills, projects, or experience!";
}
