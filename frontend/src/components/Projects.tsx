import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Filter } from 'lucide-react';

export function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Full-Stack', 'Frontend'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-32 px-4 max-w-7xl mx-auto scroll-mt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:via-transparent dark:to-pink-500/10" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-semibold text-purple-500 uppercase tracking-wider">Portfolio</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Innovative full-stack applications built with cutting-edge technologies
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-16 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Projects Data
const projects = [
  {
    title: 'Full-Stack E-Commerce Platform',
    description:
      'Complete e-commerce application with React frontend and admin dashboard. Backend powered by Node.js, Express.js, and MongoDB. Features Stripe payments, JWT authentication, Cloudinary image uploads, and order tracking.',
    category: 'Full-Stack',
    imageGradient: 'from-blue-500 via-indigo-500 to-cyan-500',
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Video Streaming Platform',
    description:
      'Full-featured video sharing platform with React frontend, admin panel, and Node.js/Express backend. Includes Cloudinary storage, AI content moderation, JWT authentication with OTP, and MongoDB database.',
    category: 'Full-Stack',
    imageGradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT'],
  },
  {
    title: 'Personal Portfolio',
    description:
      'Modern portfolio website to showcase projects, skills, and contact information. Built with React.js and Tailwind CSS for a clean, responsive design.',
    category: 'Frontend',
    imageGradient: 'from-emerald-500 via-green-500 to-teal-500',
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Gemini AI Clone',
    description:
      'Gemini AI UI clone developed using React.js. Features responsive interface with dynamic UI updates, showcasing modern frontend development skills.',
    category: 'Frontend',
    imageGradient: 'from-orange-500 via-red-500 to-rose-500',
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'CSS', 'API Integration'],
  },
];
