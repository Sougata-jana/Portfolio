import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export function MagneticSocialBubble() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate magnetic effect
  useEffect(() => {
    const bubbleX = window.innerWidth - 80;
    const bubbleY = window.innerHeight - 80;
    
    const dx = mousePosition.x - bubbleX;
    const dy = mousePosition.y - bubbleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150 && !isExpanded) {
      const force = Math.min((150 - distance) / 150, 1);
      setPosition({
        x: (dx / distance) * force * 30,
        y: (dy / distance) * force * 30,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [mousePosition, isExpanded]);

  const socials = [
    { icon: Github, href: 'https://github.com/Sougata-jana', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sougata-jana-98b14828b/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
    { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&to=janasougata198@gmail.com', label: 'Email', color: 'from-red-600 to-red-800' },
    { icon: Phone, href: 'https://wa.me/917810808132', label: 'WhatsApp', color: 'from-green-600 to-green-800' },
  ];

  return (
    <motion.div
      className="hidden md:flex fixed bottom-8 right-8 z-50"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {/* Social links - appear when expanded */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, x: 50 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, x: -5 }}
              className={`p-3 rounded-full bg-gradient-to-br ${social.color} text-white shadow-lg hover:shadow-xl transition-shadow`}
              title={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* Main bubble */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl flex items-center justify-center overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 text-white"
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          {isExpanded ? (
            <div className="text-2xl font-bold">×</div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-white rounded-full mb-1" />
              <div className="w-2 h-2 bg-white rounded-full mb-1" />
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      </motion.button>

      {/* Label */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          Quick Connect
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900" />
        </motion.div>
      )}
    </motion.div>
  );
}
