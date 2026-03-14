import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const parallaxX = useTransform(springX, (v) => v * 0.05);
  const parallaxY = useTransform(springY, (v) => v * 0.05);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
      {/* SVG Filters for Advanced Aesthetics */}
      <svg className="hidden">
        <filter id="glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
      </svg>

      {/* Advanced Optical Illusion: Scintillating Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, #fff 1px, transparent 1.5px),
              linear-gradient(to right, #ffffff10 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        />
      </div>

      {/* Liquid Glass Blobs with Parallax */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY, filter: 'blur(80px) url(#glass-distortion)' }}
        className="absolute inset-0 opacity-20 will-change-transform"
      >
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-leo-purple/30 to-transparent translate-z-0 will-change-transform"
        />
        <motion.div
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 150, -150, 0],
            scale: [1.2, 0.8, 1.2, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-leo-indigo/20 to-transparent translate-z-0 will-change-transform"
        />
      </motion.div>

      {/* Interactive Mouse Glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-leo-purple/[0.02] blur-[100px] pointer-events-none will-change-transform"
      />

      {/* Neural Network Illusion Lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="neural-grid" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
            <circle cx="75" cy="75" r="0.5" fill="white" />
            <path d="M 75 0 L 75 150 M 0 75 L 150 75" stroke="white" strokeWidth="0.2" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>
      
      {/* Noise Texture for Depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
