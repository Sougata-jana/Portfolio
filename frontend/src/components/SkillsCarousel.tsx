import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
// Simple wrap utility to replace @motionone/utils
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity: number;
}
function ParallaxText({
  children,
  baseVelocity = 100
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const {
    scrollY
  } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 200
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false
  });
  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  /**
   * The number of times to repeat the child text should be dynamic based on the size of the text and viewport.
   * For simplicity, we repeat it enough times to cover typical screen widths.
   */
  return <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-8" style={{
      x
    }}>
        {Array.from({
        length: 8
      }).map((_, i) => <span key={i} className="flex gap-8">
            {children}
          </span>)}
      </motion.div>
    </div>;
}
const skills = [{
  name: 'C',
  icon: '🔷'
}, {
  name: 'JavaScript',
  icon: '💛'
}, {
  name: 'HTML',
  icon: '🟧'
}, {
  name: 'CSS',
  icon: '🎨'
}, {
  name: 'React.js',
  icon: '⚛️'
}, {
  name: 'Next.js',
  icon: '▲'
}, {
  name: 'Node.js',
  icon: '🟢'
}, {
  name: 'Express.js',
  icon: '🚂'
}, {
  name: 'MongoDB',
  icon: '🍃'
}, {
  name: 'Git',
  icon: '📦'
}, {
  name: 'GitHub',
  icon: '🐙'
}, {
  name: 'Postman',
  icon: '📮'
}, {
  name: 'VS Code',
  icon: '💻'
}];
export function SkillsCarousel() {
  return <section className="py-20 relative z-10 overflow-hidden scroll-mt-20">
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
        >
          Technical Arsenal
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto rounded-full"
        />
      </div>

      <div className="relative w-full">
        {/* Left Shadow Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-gray-100 dark:from-slate-950 via-gray-100/80 dark:via-slate-950/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Shadow Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-gray-100 dark:from-slate-950 via-gray-100/80 dark:via-slate-950/80 to-transparent z-10 pointer-events-none" />

        <ParallaxText baseVelocity={-0.8}>
          {skills.map(skill => <div key={skill.name} className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md hover:bg-gray-300 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 hover:scale-105 transition-all duration-300 mx-2 shadow-lg">
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-lg font-medium text-slate-900 dark:text-white/90">
                {skill.name}
              </span>
            </div>)}
        </ParallaxText>

        <div className="h-12" />

        <ParallaxText baseVelocity={0.8}>
          {skills.reverse().map(skill => <div key={`${skill.name}-rev`} className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md hover:bg-gray-300 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 hover:scale-105 transition-all duration-300 mx-2 shadow-lg">
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-lg font-medium text-slate-900 dark:text-white/90">
                {skill.name}
              </span>
            </div>)}
        </ParallaxText>
      </div>
    </section>;
}