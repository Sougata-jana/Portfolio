import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Code2, Coffee, Rocket, Trophy, Star } from 'lucide-react';

export function Home() {
  const [stats] = useState([
    { icon: Code2, value: '50+', label: 'Projects Built' },
    { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
    { icon: Trophy, value: '5+', label: 'Awards Won' },
    { icon: Rocket, value: '100%', label: 'Client Satisfaction' },
  ]);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-24 md:pt-20 scroll-mt-20 bg-gray-100 dark:bg-transparent transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative max-w-6xl w-full"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-sm font-medium text-purple-700 dark:text-purple-200 mb-6 backdrop-blur-md"
            >
              MERN Stack Developer
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-800 to-pink-600 dark:from-purple-200 dark:via-white dark:to-pink-200">
                Sougata Jana
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed mb-8">
              Full-Stack Web Developer specializing in MERN stack. Building
              scalable web applications with modern technologies and clean
              code practices.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="mailto:janasougata198@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/20 border border-white/20 backdrop-blur-sm"
              >
                Get In Touch
              </motion.a>

              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-white/10 backdrop-blur-sm hover:bg-slate-200 dark:hover:border-white/30 transition-colors"
              >
                View Projects
              </motion.button>
            </div>

            <div className="flex gap-4">
              {[
                { Icon: Github, href: 'https://github.com/Sougata-web', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/sougata-jana', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:janasougata198@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-3 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Profile Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-first md:order-last"
          >
            <div className="relative w-full max-w-md mx-auto">
              <img
                src="/profile.png"
                alt="Sougata Jana"
                
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-white/30"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
