import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, MessageSquare, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onOpenChat: () => void;
}
export function Navbar({
  onOpenChat
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const {
    scrollY
  } = useScroll();
  
  useMotionValueEvent(scrollY, 'change', latest => {
    // Add background when scrolled
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
    { name: 'Skills', id: 'skills' }
  ];
  return <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-100/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg shadow-purple-500/10' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => {
            setIsMobileMenuOpen(false);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-800 to-pink-600 dark:from-purple-200 dark:via-white dark:to-pink-200 group-hover:opacity-80 transition-opacity">
                SJ.
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.id)} className="cursor-pointer text-sm font-medium text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </button>)}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, rotate: 180 }}
                className="cursor-pointer relative p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-purple-500/30 transition-all overflow-hidden group"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={18} className="text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={18} className="text-purple-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={onOpenChat} className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                <Sparkles size={16} className="text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300" />
                <span className="text-sm font-medium text-slate-700 dark:text-white/90">
                  Ask AI
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9, rotate: 180 }}
                className="cursor-pointer p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-purple-400" />
                )}
              </motion.button>
              
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="cursor-pointer p-2 rounded-lg text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="md:hidden bg-gray-100/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="px-4 py-6 space-y-4">
                {navLinks.map(link => <button key={link.name} onClick={() => scrollToSection(link.id)} className="cursor-pointer block w-full text-left text-lg font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white py-2">
                    {link.name}
                  </button>)}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <button onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenChat();
              }} className="cursor-pointer flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-slate-900 dark:text-white font-medium">
                    <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                    Ask AI Assistant
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>

      {/* Floating Chat Button (Mobile) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpenChat} 
        className="cursor-pointer fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 text-white md:hidden"
      >
        <MessageSquare size={24} />
      </motion.button>
    </>;
}