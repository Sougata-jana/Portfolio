import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Circular progress indicator */}
      <motion.div
        className="fixed bottom-32 left-8 z-40 hidden md:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollProgress > 5 ? 1 : 0,
          scale: scrollProgress > 5 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-700 dark:text-white/10"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rocket icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Rocket
                size={20}
                className="text-purple-600 dark:text-purple-400"
                style={{
                  transform: `rotate(${scrollProgress * 3.6}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              />
            </motion.div>
          </div>

          {/* Percentage text */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
            {Math.round(scrollProgress)}%
          </div>
        </div>

        {/* Scroll to top button */}
        {scrollProgress > 20 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute top-20 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
          >
            Back to Top
          </motion.button>
        )}
      </motion.div>
    </>
  );
}
