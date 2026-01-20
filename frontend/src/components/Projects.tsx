import React from 'react';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section id="projects" className="py-32 px-4 max-w-7xl mx-auto scroll-mt-20 bg-gray-100 dark:bg-transparent transition-colors">
      <div className="mb-16 pl-4 border-l-4 border-purple-500">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Featured Projects</h2>
        <p className="text-slate-600 dark:text-white/50 text-lg">
          Full-stack applications built with modern technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
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
    imageGradient: 'from-blue-500 to-cyan-500',
    size: 'large' as const,
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Video Streaming Platform',
    description:
      'Full-featured video sharing platform with React frontend, admin panel, and Node.js/Express backend. Includes Cloudinary storage, AI content moderation, JWT authentication with OTP, and MongoDB database. Features: video upload/playback, likes, comments, bookmarks, playlists, notifications, and admin analytics.',
    category: 'Full-Stack',
    imageGradient: 'from-purple-500 to-pink-500',
    size: 'large' as const,
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT'],
  },
  {
    title: 'Personal Portfolio',
    description:
      'Modern portfolio website to showcase projects, skills, and contact information. Built with React.js and Tailwind CSS for a clean, responsive design.',
    category: 'Frontend',
    imageGradient: 'from-emerald-500 to-teal-500',
    size: 'medium' as const,
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'Tailwind CSS'],
  },
  {
    title: 'Gemini AI Clone',
    description:
      'Gemini AI UI clone developed using React.js. Features responsive interface with dynamic UI updates, showcasing modern frontend development skills.',
    category: 'Frontend',
    imageGradient: 'from-orange-500 to-red-500',
    size: 'medium' as const,
    githubUrl: 'https://github.com/Sougata-web',
    liveUrl: '#',
    technologies: ['React', 'CSS'],
  },
];
