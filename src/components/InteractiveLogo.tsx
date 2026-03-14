import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function InteractiveLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Reduced sensitivity from /2 to /4 for smoother, more subtle movement
    mouseX.set((e.clientX - centerX) / 4);
    mouseY.set((e.clientY - centerY) / 4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="flex items-center gap-3 md:gap-4 group cursor-pointer relative z-10"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
        {/* Background Glow */}
        <motion.div 
          className="absolute inset-0 rounded-xl bg-leo-purple/20 blur-lg"
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.8 : 0.4
          }}
        />
        
        {/* Main Logo Container */}
        <motion.div 
          style={{ x, y }}
          className="relative w-full h-full rounded-xl bg-gradient-to-tr from-leo-purple to-leo-indigo flex items-center justify-center shadow-lg shadow-leo-purple/20 overflow-hidden"
        >
          {/* Animated Internal Elements */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 border border-white/20 rounded-full scale-150" />
            <div className="absolute inset-0 border border-white/10 rounded-full scale-110" />
          </motion.div>

          {/* Central Symbol (Neural Node) */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div 
              className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Orbiting Dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: `${12 + i * 4}px center`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-0.75px',
                  marginTop: '-0.75px'
                }}
              />
            ))}
          </div>

          {/* Shimmer Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full"
            animate={isHovered ? { x: ['100%', '-100%'] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        <span className="font-display font-black tracking-tighter text-2xl md:text-3xl leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-leo-purple group-hover:to-leo-indigo transition-all duration-500">
          RUDRA
        </span>
        <motion.span 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-leo-purple/60 transition-colors duration-500"
        >
          Autonomous Intelligence
        </motion.span>
      </div>
    </div>
  );
}
