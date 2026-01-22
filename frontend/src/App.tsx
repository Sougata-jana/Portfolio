import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

export function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gray-100 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-500">
        <Navbar onOpenChat={() => setIsChatOpen(true)} />
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Animated Background */}
      {/* <div className="fixed inset-0 z-0">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f0c29] to-slate-950"
        />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] animate-pulse delay-2000" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div> */}

      <main className="relative z-10">
        
        {/* Home Section */}
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
      </main>
      </div>
    </ThemeProvider>
  );
}
