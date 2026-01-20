import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  index: number;
}
export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  index
}: BlogCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} className="group relative">
      {/* Gradient Border Wrapper */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-30 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-500" />

      {/* Card Content */}
      <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-slate-900/60 transition-colors duration-300">
        <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-4">{excerpt}</p>

        <div className="flex items-center text-sm font-medium text-purple-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Read Article →
        </div>
      </div>
    </motion.div>;
}