import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail effect (throttled to every 50ms for performance)
      const now = Date.now();
      if (now - lastTrailTimeRef.current > 50) {
        const newTrail = { x: e.clientX, y: e.clientY, id: trailIdRef.current++ };
        setTrails((prev) => [...prev.slice(-5), newTrail]); // Keep last 5 trails
        lastTrailTimeRef.current = now;
      }

      // Check if hovering over interactive element (simplified check)
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      
      setIsPointer(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          style={{
            left: trail.x,
            top: trail.y,
            width: 6 + index * 2,
            height: 6 + index * 2,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-full h-full rounded-full bg-purple-400" />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 border-2 border-white rounded-full"
          animate={{ scale: isPointer ? 1.5 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-1 h-1 bg-white rounded-full"
          animate={{ scale: isPointer ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
