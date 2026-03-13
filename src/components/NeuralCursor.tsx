import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function NeuralCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 rounded-full border border-leo-purple/50 pointer-events-none z-[9999] mix-blend-screen hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        borderColor: isHovering ? 'rgba(251, 191, 36, 0.8)' : 'rgba(124, 58, 237, 0.5)',
        rotate: isHovering ? 45 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div 
        className="absolute inset-0 rounded-full bg-leo-purple/10 blur-md"
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(251, 191, 36, 0.2)' : 'rgba(124, 58, 237, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="w-1.5 h-1.5 bg-leo-purple rounded-full shadow-[0_0_15px_rgba(124,58,237,0.8)]"
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {isHovering && (
        <>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute w-full h-full border-2 border-leo-gold/50 rounded-full animate-[spin_2s_linear_infinite]"
            style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 0.5 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute w-full h-full border border-leo-purple/50 rounded-full animate-[spin_3s_linear_reverse_infinite]"
            style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
          />
        </>
      )}
    </motion.div>
  );
}
