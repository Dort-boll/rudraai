import React, { memo } from 'react';
import { motion } from 'motion/react';

interface HypnoticPatternProps {
  color: string;
  type: 'circles' | 'grid' | 'waves' | 'spiral' | 'moire' | 'tunnel';
}

const HypnoticPattern = memo(({ color, type }: HypnoticPatternProps) => {
  switch (type) {
    case 'circles':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border border-white/10 rounded-full will-change-transform"
              style={{
                width: (i + 1) * 300,
                height: (i + 1) * 300,
                x: '-50%',
                y: '-50%',
                borderColor: `${color}15`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 25 + i * 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}
        </div>
      );
    case 'grid':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `linear-gradient(${color}15 1px, transparent 1px), linear-gradient(90deg, ${color}15 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              perspective: '1000px',
              transform: 'rotateX(60deg) translateY(-20%) translateZ(0)',
            }}
          >
            <motion.div
              className="absolute inset-0 will-change-[background-position]"
              animate={{
                backgroundPosition: ['0px 0px', '0px 50px'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      );
    case 'waves':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 will-change-transform"
              style={{
                background: `radial-gradient(circle at ${50 + i * 15}% ${50 + i * 10}%, ${color}08 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, 40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    case 'spiral':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 flex items-center justify-center">
          <motion.div
            className="w-[300%] h-[300%] flex-shrink-0 will-change-transform"
            style={{
              background: `repeating-conic-gradient(from 0deg, transparent 0deg, ${color}20 5deg, transparent 10deg)`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute w-[250%] h-[250%] flex-shrink-0 will-change-transform"
            style={{
              background: `repeating-conic-gradient(from 0deg, transparent 0deg, ${color}15 8deg, transparent 16deg)`,
            }}
            animate={{
              rotate: -360,
              scale: [1.05, 1, 1.05]
            }}
            transition={{
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
      );
    case 'moire':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-[180%] h-[180%] border-[40px] border-dashed rounded-full will-change-transform"
              style={{ borderColor: `${color}15` }}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-[150%] h-[150%] border-[30px] border-dotted rounded-full will-change-transform"
              style={{ borderColor: `${color}20` }}
              animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      );
    case 'tunnel':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 rounded-[30%] will-change-transform"
              style={{
                width: 100,
                height: 100,
                x: '-50%',
                y: '-50%',
                borderColor: `${color}${Math.floor((1 - i/8) * 30).toString(16).padStart(2, '0')}`,
              }}
              animate={{
                width: [100, 1800],
                height: [100, 1800],
                opacity: [0, 0.8, 0],
                rotate: [0, 180 + i * 15],
                borderRadius: ["30%", "50%", "30%"]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
});

HypnoticPattern.displayName = 'HypnoticPattern';

export default HypnoticPattern;
