import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, MapPin, Heart, Sparkles, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      Icon: Github, 
      href: 'https://github.com/Sougata-jana',
      label: 'GitHub',
      color: 'hover:bg-slate-700 hover:text-white'
    },
    { 
      Icon: Linkedin, 
      href: 'https://www.linkedin.com/in/sougata-jana-98b14828b/',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    { 
      Icon: Mail, 
      href: 'mailto:janasougata198@gmail.com',
      label: 'Email',
      color: 'hover:bg-purple-600 hover:text-white'
    },
  ];

  const contactInfo = [
    { Icon: Mail, text: 'janasougata198@gmail.com', href: 'mailto:janasougata198@gmail.com' },
    { Icon: MessageCircle, text: '+91 7821808132', href: 'https://wa.me/917810808132' },
    { Icon: MapPin, text: 'West Bengal, India' },
  ];

  return (
    <footer id="contact" className="relative scroll-mt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-purple-900/10 dark:from-transparent dark:via-purple-500/10 dark:to-purple-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-8 md:p-12 text-center relative overflow-hidden mb-16"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
            <motion.div
              className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10 mb-6 flex justify-center"
            >
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">
              Let's Create Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Amazing
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              I'm always excited to collaborate on innovative projects and explore new opportunities. 
              Let's connect and bring your ideas to life!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-10">
              <motion.a
                href="mailto:janasougata198@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Send Email
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://wa.me/917810808132"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-2 border-slate-300 dark:border-slate-600 hover:border-green-500 dark:hover:border-green-500 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 relative z-10">
              {socialLinks.map(({ Icon, href, label, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-all ${color}`}
                  aria-label={label}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* About */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sougata Jana</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Full-Stack Developer passionate about creating beautiful, functional web applications.
              </p>
            </div>

            {/* Quick Contact */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quick Contact</h3>
              <div className="space-y-2">
                {contactInfo.map(({ Icon, text, href }, i) => (
                  <div key={i} className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <Icon size={16} className="text-purple-500" />
                    {href ? (
                      <a href={href} className="hover:text-purple-500 transition-colors">
                        {text}
                      </a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quick Links</h3>
              <div className="space-y-2">
                {['Home', 'About', 'Projects', 'Blog'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-slate-600 dark:text-slate-400 text-sm hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm text-center md:text-left">
                © {currentYear} Sougata Jana. 
               
              </p>
              
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
