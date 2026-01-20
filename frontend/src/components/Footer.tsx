import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="py-20 px-4 relative scroll-mt-20 bg-gray-100 dark:bg-transparent transition-colors">
      <div className="max-w-4xl mx-auto">
        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl bg-gray-200/60 dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-slate-900/40 border border-slate-300 dark:border-white/10 backdrop-blur-xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">
            Let's Build Something Together
          </h2>
          <p className="text-slate-700 dark:text-white/60 mb-8 max-w-lg mx-auto relative z-10">
            I'm always interested in hearing about new projects and
            opportunities. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-10">
            <motion.a
              href="mailto:janasougata198@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-colors"
            >
              Send Email
            </motion.a>
            <motion.a
              href="tel:+917821808132"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold border border-slate-300 dark:border-white/20 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
            >
              Call Me
            </motion.a>
          </div>

          <div className="flex justify-center gap-6 relative z-10">
            {[
              { Icon: Github, href: 'https://github.com/Sougata-web' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/sougata-jana' },
              { Icon: Mail, href: 'mailto:janasougata198@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#fff' }}
                className="p-3 rounded-full bg-gray-300 dark:bg-white/5 border border-slate-400 dark:border-white/10 text-slate-700 dark:text-white/60 hover:bg-gray-400 dark:hover:bg-white/10 hover:border-slate-500 dark:hover:border-white/20 transition-all"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12 text-white/30 text-sm">
          <p>© 2024 Sougata Jana. Built with React & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
