import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, Tag, ArrowRight, Search } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
  views: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const categories = ['All', 'Technology', 'Web Development', 'MERN Stack', 'Tutorial', 'Experience'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.BLOGS_PUBLISHED);
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback to sample data if backend is not available
      setBlogs(sampleBlogs);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (blogId: string) => {
    try {
      await fetch(API_ENDPOINTS.BLOG_VIEW(blogId), {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    incrementViews(blog._id);
    // Scroll to blog section instantly when opening blog detail
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <section id="blog" className="py-32 px-4 max-w-7xl mx-auto scroll-mt-20 bg-gray-100 dark:bg-transparent transition-colors">
      {/* Header */}
      <div className="mb-16 pl-4 border-l-4 border-purple-500">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Blog & Articles</h2>
        <p className="text-slate-600 dark:text-white/50 text-lg">
          Sharing my journey, learnings, and experiences in web development
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-white/40" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 backdrop-blur-xl transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white/70 hover:bg-gray-300 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-6 animate-pulse">
              <div className="w-full h-48 bg-gray-300 dark:bg-white/10 rounded-2xl mb-4" />
              <div className="h-6 bg-gray-300 dark:bg-white/10 rounded mb-3" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded mb-2" />
              <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleBlogClick(blog)}
                  className="group rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-6 hover:bg-gray-300 dark:hover:bg-white/10 transition-all cursor-pointer overflow-hidden relative"
                >
                  {/* Image/Gradient */}
                  <div className="w-full h-48 rounded-2xl mb-4 bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden relative">
                    {blog.imageUrl ? (
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/80">
                        <Tag size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
                      {blog.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-slate-700 dark:text-white/60 text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-lg bg-gray-300/60 dark:bg-white/5 text-xs text-slate-600 dark:text-white/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-300 dark:border-white/10">
                      <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-white/40">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{blog.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{blog.views || 0}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600 dark:text-white/50 text-lg">No blog posts found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Blog Detail Component
function BlogDetail({ blog, onBack }: { blog: Blog; onBack: () => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="py-32 px-4 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors group"
      >
        <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to all articles
      </button>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-8 md:p-12"
      >
        {/* Category Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium mb-6">
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-white/50 text-sm mb-8 pb-8 border-b border-slate-300 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{blog.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{blog.views || 0} views</span>
          </div>
          <span>By {blog.author}</span>
        </div>

        {/* Image */}
        {blog.imageUrl && (
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-slate-800 dark:text-white/80 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-300 dark:border-white/10">
            <h3 className="text-slate-600 dark:text-white/50 text-sm font-medium mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-gray-300/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white/70 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </section>
  );
}

// Sample blogs for fallback
const sampleBlogs: Blog[] = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack Development',
    content: `The MERN stack has become one of the most popular technology stacks for building modern web applications. In this comprehensive guide, I'll share my journey and experiences working with MongoDB, Express.js, React.js, and Node.js.

## What is MERN Stack?

MERN is an acronym for four powerful technologies:
- **MongoDB**: A NoSQL database
- **Express.js**: A web application framework for Node.js
- **React.js**: A JavaScript library for building user interfaces
- **Node.js**: A JavaScript runtime environment

## Why Choose MERN?

1. **JavaScript Everywhere**: Use JavaScript for both frontend and backend
2. **Strong Community**: Extensive resources and support
3. **Scalability**: Build applications that can grow with your needs
4. **Modern Tools**: Access to the latest web development tools

## My Experience

During my internship at Zidio Technologies, I worked extensively with the MERN stack to build full-featured web applications. The experience taught me valuable lessons about full-stack development and best practices.

## Key Takeaways

- Start with solid fundamentals in JavaScript
- Learn React hooks and state management
- Understand RESTful API design
- Practice with real projects
- Never stop learning!`,
    excerpt: 'A comprehensive guide to getting started with MERN stack development based on my learning journey and internship experience.',
    author: 'Sougata Jana',
    category: 'MERN Stack',
    tags: ['MERN', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    imageUrl: '',
    readTime: '8 min read',
    views: 245,
    published: true,
    createdAt: new Date('2026-01-10').toISOString(),
    updatedAt: new Date('2026-01-10').toISOString()
  },
  {
    _id: '2',
    title: 'My Internship Experience at Zidio Technologies',
    content: `Completing my MERN stack development internship at Zidio Technologies was a transformative experience that significantly enhanced my skills and confidence as a developer.

## The Beginning

Starting the internship, I was excited but also nervous about working on real-world projects. The first week involved understanding the project requirements and setting up the development environment.

## What I Learned

### Technical Skills
- Building RESTful APIs with Express.js
- State management in React applications
- MongoDB database design and optimization
- Authentication with JWT
- Testing APIs with Postman

### Soft Skills
- Team collaboration using Git
- Code reviews and best practices
- Project planning and time management
- Communication with team members

## Key Projects

I worked on several features for the company's main application:
1. User authentication system
2. Dashboard with data visualization
3. Admin panel for content management
4. Integration with third-party APIs

## Challenges Faced

Like any real project, there were challenges:
- Debugging complex state management issues
- Optimizing database queries
- Handling edge cases in user input
- Meeting project deadlines

## Advice for Future Interns

1. Don't be afraid to ask questions
2. Take initiative on tasks
3. Document your code well
4. Learn from code reviews
5. Network with your colleagues`,
    excerpt: 'Reflections on my internship journey at Zidio Technologies and the valuable lessons learned in MERN stack development.',
    author: 'Sougata Jana',
    category: 'Experience',
    tags: ['Internship', 'Career', 'Learning', 'MERN'],
    imageUrl: '',
    readTime: '6 min read',
    views: 189,
    published: true,
    createdAt: new Date('2025-12-20').toISOString(),
    updatedAt: new Date('2025-12-20').toISOString()
  },
  {
    _id: '3',
    title: 'Building a Full-Stack E-Commerce Platform: Lessons Learned',
    content: `Creating a complete e-commerce platform from scratch was one of the most challenging and rewarding projects I've undertaken. Here's what I learned.

## Project Overview

The e-commerce platform included:
- User authentication and authorization
- Product catalog with search and filters
- Shopping cart functionality
- Stripe payment integration
- Admin dashboard
- Order tracking system

## Technical Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Payment**: Stripe API
- **Storage**: Cloudinary for images
- **Authentication**: JWT tokens

## Key Features Implemented

### 1. User Authentication
Implemented secure authentication using JWT tokens with refresh token mechanism for enhanced security.

### 2. Payment Integration
Integrated Stripe for handling payments securely. Learning to work with webhooks was particularly interesting.

### 3. Admin Dashboard
Built a comprehensive admin panel for managing products, orders, and users with real-time updates.

### 4. Image Management
Used Cloudinary for storing and optimizing product images with automatic resizing and compression.

## Challenges and Solutions

### Performance Optimization
- Implemented pagination for large product lists
- Used MongoDB indexing for faster queries
- Added image lazy loading on frontend

### Security
- Input validation on both frontend and backend
- Rate limiting for API endpoints
- Secure password hashing with bcrypt

### State Management
Used React Context API for global state management, though for larger apps, Redux might be better.

## What I Would Do Differently

Looking back, here are some improvements I would make:
1. Add comprehensive unit tests from the start
2. Implement better error logging
3. Use TypeScript for type safety
4. Add more advanced search features
5. Implement caching strategies

## Conclusion

This project taught me the importance of planning, security, and user experience in building production-ready applications.`,
    excerpt: 'A detailed walkthrough of building a full-featured e-commerce platform with MERN stack, including challenges and solutions.',
    author: 'Sougata Jana',
    category: 'Web Development',
    tags: ['E-Commerce', 'React', 'Node.js', 'Stripe', 'Project'],
    imageUrl: '',
    readTime: '10 min read',
    views: 312,
    published: true,
    createdAt: new Date('2025-11-15').toISOString(),
    updatedAt: new Date('2025-11-15').toISOString()
  }
];
