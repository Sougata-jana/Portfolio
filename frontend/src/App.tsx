import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { AIChat } from './components/AIChat';
import { Home } from './components/Home';
import { SkillsCarousel } from './components/SkillsCarousel';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { Loader } from './components/Loader';

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800); // 1.8s loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-500">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 z-[100] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        />

        <Navbar onOpenChat={() => setIsChatOpen(true)} />
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Animated Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0"
          >
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[5%] w-[45%] h-[45%] rounded-full bg-pink-500/5 dark:bg-pink-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[50%] left-[50%] w-[35%] h-[35%] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyNywgMTI3LCAxMjcsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40 dark:opacity-20" />
        </div>

        {/* Page Transition Animation */}
        <AnimatePresence mode="wait">
          <main className="relative z-10">
            {/* Home Section */}
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <Home />
              {/* Skills Section - Technical Arsenal */}
              <SkillsCarousel />
              {/* About Section */}
              <About />
              {/* Detailed Skills Section */}
              <Skills />
              {/* Projects Section */}
              <Projects />
              {/* Blog Section */}
              <Blog />
              {/* Footer / Contact Section */}
              <Footer />
            </motion.div>
          </main>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
