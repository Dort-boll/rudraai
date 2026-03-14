import React from 'react';
import { motion } from 'motion/react';

export default function HypnoticPatternOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
      {/* Rotating Spiral Pattern */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] will-change-transform"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <pattern id="spiral" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4" fill="none" stroke="white" strokeWidth="0.1" />
              <circle cx="5" cy="5" r="2" fill="none" stroke="white" strokeWidth="0.05" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#spiral)" />
        </svg>
      </motion.div>

      {/* Moiré Effect Layer */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, black 100%), repeating-radial-gradient(circle at center, white 0, white 1px, transparent 1px, transparent 20px)`,
          backgroundSize: '100% 100%, 40px 40px',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Pulsing Depth Rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "easeOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full border border-white/20"
        />
      ))}
    </div>
  );
}
