import React from 'react';
import { motion } from 'framer-motion';

export function Loader() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1, rotate: [0, 360] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="mb-8"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="8" strokeDasharray="56 56" strokeDashoffset="0" />
          <circle cx="40" cy="40" r="24" stroke="#fff" strokeWidth="4" opacity="0.3" />
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold tracking-tight mb-2 drop-shadow-lg"
      >
        Welcome to Sougata's Portfolio
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg md:text-xl text-white/80 mb-4"
      >
        Loading your experience...
      </motion.p>
    </div>
  );
}
