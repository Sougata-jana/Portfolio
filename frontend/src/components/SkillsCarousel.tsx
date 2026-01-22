import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { 
  SiC, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiGit, 
  SiGithub, 
  SiPostman 
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
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
  Icon: SiC,
  color: '#A8B9CC'
}, {
  name: 'JavaScript',
  Icon: SiJavascript,
  color: '#F7DF1E'
}, {
  name: 'HTML',
  Icon: SiHtml5,
  color: '#E34F26'
}, {
  name: 'CSS',
  Icon: SiCss3,
  color: '#1572B6'
}, {
  name: 'React.js',
  Icon: SiReact,
  color: '#61DAFB'
}, {
  name: 'Next.js',
  Icon: SiNextdotjs,
  color: '#000000'
}, {
  name: 'Node.js',
  Icon: SiNodedotjs,
  color: '#339933'
}, {
  name: 'Express.js',
  Icon: SiExpress,
  color: '#000000'
}, {
  name: 'MongoDB',
  Icon: SiMongodb,
  color: '#47A248'
}, {
  name: 'Git',
  Icon: SiGit,
  color: '#F05032'
}, {
  name: 'GitHub',
  Icon: SiGithub,
  color: '#181717'
}, {
  name: 'Postman',
  Icon: SiPostman,
  color: '#FF6C37'
}, {
  name: 'VS Code',
  Icon: VscCode,
  color: '#007ACC'
}];
export function SkillsCarousel() {
  return <section className="py-24 relative z-10 overflow-hidden scroll-mt-20 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-950/10">
      <div className="mb-20 text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 mb-6 tracking-tight"
        >
          Technical Arsenal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6"
        >
          Technologies I work with to bring ideas to life
        </motion.p>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full"
        />
      </div>

      <div className="relative w-full">
        {/* Left Shadow Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-gray-100 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        
        {/* Right Shadow Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-gray-100 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <ParallaxText baseVelocity={-0.8}>
          {skills.map(skill => {
            const IconComponent = skill.Icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
            return (
              <div 
                key={skill.name} 
                className="inline-flex items-center justify-center p-6 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 mx-2"
              >
                <IconComponent 
                  className="w-12 h-12"
                  style={{ color: skill.color }}
                />
              </div>
            );
          })}
        </ParallaxText>
      </div>
    </section>;
}