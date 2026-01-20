import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageGradient: string;
  size?: 'small' | 'medium' | 'large';
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
  size = 'medium',
  index,
  githubUrl,
  liveUrl,
  technologies = []
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Parallax effect
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  // Different parallax speeds based on index/column for staggered feel
  const y = useTransform(scrollYProgress, [0, 1], [50 * (index % 2 === 0 ? 1 : -0.5), -50 * (index % 2 === 0 ? 1 : -0.5)]);
  // Grid span classes
  const spanClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2'
  };
  return <motion.div ref={ref} style={{
    y
  }} className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl ${spanClasses[size]}`} whileHover={{
    y: -5,
    transition: {
      duration: 0.2
    }
  }}>
      {/* Background Gradient/Image Placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${imageGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
            {category}
          </span>
          <div className="flex gap-2">
            {githubUrl && <motion.a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }}>
                <Github size={18} />
              </motion.a>}
            {liveUrl && <motion.a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" whileHover={{
            scale: 1.1,
            rotate: 45
          }} whileTap={{
            scale: 0.95
          }}>
                <ExternalLink size={18} />
              </motion.a>}
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
            {title}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-3">
            {description}
          </p>

          {technologies.length > 0 && <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => <span key={i} className="px-2 py-1 text-xs rounded-lg bg-white/5 text-white/70 border border-white/10">
                  {tech}
                </span>)}
            </div>}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>;
}