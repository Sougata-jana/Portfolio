import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageGradient: string;
  index: number;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
}
export function ProjectCard({
  title,
  description,
  category,
  imageGradient,
  index,
  githubUrl,
  liveUrl,
  technologies = []
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-800"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${imageGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Animated Border Gradient */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-2xl" />
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl h-full">
        {/* Image/Gradient Section */}
        <div className={`relative h-48 bg-gradient-to-br ${imageGradient} overflow-hidden`}>
          {/* Animated Sparkles */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-16 h-16 text-white/20" />
          </motion.div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/30">
              {category}
            </span>
          </div>
          
          {/* Links */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors border border-white/30"
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}