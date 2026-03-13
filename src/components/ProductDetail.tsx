import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Zap, Cpu, Lock, Globe, ExternalLink, Info, Activity, Shield, Brain, FlaskConical, Dna, Stethoscope, Code2, Palette, Search, ShieldAlert, Layers, Waves, Fingerprint } from 'lucide-react';
import HypnoticPattern from './HypnoticPattern';

interface ProductDetailProps {
  product: any;
  onClose: () => void;
}

const ModuleVisualizer = ({ product }: { product: any }) => {
  const color = product.color;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        mouseX.set(x);
        mouseY.set(y);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  const tiltStyle = {
    rotateY: springX,
    rotateX: useTransform(springY, (v) => -v),
    perspective: 1000
  };
  
  switch (product.name) {
    case 'VayuMind AI':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={tiltStyle}
        >
          <motion.div 
            className="relative w-64 h-64"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain size={100} className="absolute inset-0 m-auto opacity-20" style={{ color }} />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 rounded-full opacity-20 will-change-transform"
                style={{ borderColor: color }}
                animate={{ 
                  scale: [1, 2.2], 
                  opacity: [0.2, 0],
                  rotate: i * 60
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeOut" 
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-48 h-48 rounded-full blur-[100px] opacity-40"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      );
    case 'Vayu Research AI':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="grid grid-cols-3 gap-4 w-full h-full p-12">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center relative overflow-hidden will-change-transform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent translate-z-0"
                  animate={{ top: ["-100%", "100%"] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
                />
                <FlaskConical size={24} className="opacity-20" style={{ color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    case 'BioMind AI':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="flex gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-6">
                {[...Array(10)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ 
                      y: [0, 50, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      delay: (i * 0.2) + (j * 0.1), 
                      repeat: Infinity 
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <Dna size={160} className="absolute opacity-10 rotate-45" style={{ color }} />
        </motion.div>
      );
    case 'GenAI Doctor':
      return (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-8"
          style={tiltStyle}
        >
          <div className="w-full h-32 relative border-y border-white/5 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 L200,50 L220,10 L260,90 L300,50 L500,50 L520,0 L560,100 L600,50 L1000,50"
                fill="none"
                stroke={color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            {/* Illusion Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50" />
          </div>
          <div className="grid grid-cols-3 gap-4 w-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                <div className="text-[8px] uppercase tracking-widest text-white/20 relative z-10">Vitals {i+1}</div>
                <motion.div 
                  className="h-1 bg-white/10 rounded-full overflow-hidden relative z-10"
                  animate={{ width: ["10%", "90%", "40%", "80%"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i }}
                >
                  <div className="h-full w-full" style={{ backgroundColor: color }} />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    case 'Vayu IDE':
      return (
        <motion.div 
          className="absolute inset-0 p-8 font-mono text-[10px]"
          style={tiltStyle}
        >
          <div className="w-full h-full rounded-2xl bg-black/40 border border-white/5 p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <div className="space-y-2 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              <div className="text-leo-purple">class NeuralCore {'{'}</div>
              <div className="pl-4">constructor() {'{'}</div>
              <div className="pl-8 text-leo-indigo">this.intelligence = new AGI();</div>
              <div className="pl-8 text-leo-indigo">this.autonomy = true;</div>
              <div className="pl-4">{'}'}</div>
              <div className="pl-4">async synthesize() {'{'}</div>
              <div className="pl-8 text-leo-gold">return await this.intelligence.process();</div>
              <div className="pl-4">{'}'}</div>
              <div>{'}'}</div>
            </div>
            
            {/* Illusion Layer */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/10 rounded-tr-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div 
              className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Compiler Active</span>
            </motion.div>
          </div>
        </motion.div>
      );
    case 'Vayu Creative Studio':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-white/10 rounded-2xl"
                style={{ 
                  width: 100 + i * 50, 
                  height: 100 + i * 50,
                  borderColor: `${color}${Math.floor((1 - i/5) * 40).toString(16).padStart(2, '0')}`
                }}
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                  borderRadius: ["20%", "40%", "20%"]
                }}
                transition={{ 
                  duration: 10 + i * 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            ))}
            <Palette size={80} style={{ color }} className="relative z-10 opacity-40" />
            
            {/* Color Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full blur-sm"
                style={{ backgroundColor: color }}
                animate={{ 
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 400],
                  opacity: [0, 0.8, 0],
                  scale: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4 + Math.random() * 4, 
                  repeat: Infinity, 
                  delay: Math.random() * 5 
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    case 'Spark AI':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="relative w-64 h-64">
            <motion.div 
              className="absolute inset-0 border-2 border-dashed rounded-full opacity-20"
              style={{ borderColor: color }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Search size={60} style={{ color }} className="opacity-40" />
            </div>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: '50%',
                  top: '50%'
                }}
                animate={{ 
                  x: [0, (Math.random() - 0.5) * 300],
                  y: [0, (Math.random() - 0.5) * 300],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    case 'Vayu IDS':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            <ShieldAlert size={80} style={{ color }} className="opacity-40" />
            <motion.div 
              className="absolute inset-0 border-4 rounded-full opacity-10"
              style={{ borderColor: color }}
              animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute inset-0">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-white/5 rounded-full"
                  animate={{ rotate: i * 90 + 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    case 'Threat Map':
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <div className="relative w-72 h-72">
            <Globe size={120} style={{ color }} className="absolute inset-0 m-auto opacity-20" />
            <motion.div 
              className="absolute inset-0 border border-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-4 border border-white/5 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ 
                  backgroundColor: i % 3 === 0 ? '#ef4444' : color,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.2, 1, 0.2]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    default:
      return (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={tiltStyle}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              borderRadius: ["30%", "50%", "30%"]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 blur-[80px] opacity-20"
            style={{ backgroundColor: color }}
          />
          <div className="relative z-10 scale-[2]">
            {React.cloneElement(product.icon, { size: 100, style: { color } })}
          </div>
        </motion.div>
      );
  }
};

const NeuralMirroringVisualizer = ({ color }: { color: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    let frameId: number;
    const handleMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] bg-black/60 border border-white/5 overflow-hidden group/mirror">
      {/* Illusion Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">
          {/* Pulsating Circles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-white/5 rounded-full will-change-transform"
              style={{
                scale: 1 + i * 0.4,
                borderColor: color,
                opacity: 0.1 - i * 0.02,
                x: useTransform(springX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * (0.01 * (i + 1))),
                y: useTransform(springY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * (0.01 * (i + 1))),
              }}
              animate={{
                scale: [1 + i * 0.4, 1.15 + i * 0.4, 1 + i * 0.4],
                opacity: [0.08, 0.15, 0.08]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10 will-change-transform"
            style={{
              x: useTransform(springX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.03),
              y: useTransform(springY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.03),
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 blur-2xl opacity-40"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <Brain size={80} style={{ color }} className="relative z-10 drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Neural Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <NeuralLine key={i} color={color} mouseX={springX} mouseY={springY} index={i} />
        ))}
      </svg>

      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Algorithm: Neural Mirroring v4.2</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">Sync Frequency</span>
          <div className="flex gap-1.5 items-end h-8">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white/10 rounded-full"
                animate={{ 
                  height: [8, Math.random() * 32 + 8, 8],
                  backgroundColor: [ 'rgba(255,255,255,0.1)', color, 'rgba(255,255,255,0.1)' ]
                }}
                transition={{ 
                  duration: 1.5 + Math.random(), 
                  repeat: Infinity, 
                  delay: i * 0.05 
                }}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Mirroring Depth</div>
          <div className="text-3xl font-display font-black leo-gradient">98.4%</div>
        </div>
      </div>
    </div>
  );
};

const NeuralLine = ({ color, mouseX, mouseY, index }: { color: string, mouseX: any, mouseY: any, index: number }) => {
  const path = useTransform([mouseX, mouseY], ([x, y]: any) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offset = (index - 6) * 30;
    return `M ${x} ${y} C ${x + offset} ${y - offset}, ${centerX - offset} ${centerY + offset}, ${centerX} ${centerY}`;
  });

  return (
    <motion.path
      d={path}
      stroke={color}
      strokeWidth="1"
      fill="none"
      opacity="0.15"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.15 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
    />
  );
};

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto overflow-x-hidden"
    >
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <HypnoticPattern color={product.color} type={product.pattern || 'circles'} />
      </div>

      {/* Advanced Optical Illusion: Peripheral Vision Dots */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4">
          {[...Array(144)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-white/10"
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 0.1, 
                repeat: Infinity, 
                delay: Math.random() * 10,
                repeatDelay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Neural Data Blips */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[7px] text-white/5 whitespace-nowrap flex flex-col gap-1"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -800],
              opacity: [0, 0.4, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
            }}
            transition={{ 
              duration: 15 + Math.random() * 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <span>{Math.random().toString(16).slice(2, 12).toUpperCase()}</span>
            <span className="opacity-50">{Math.random().toString(2).slice(2, 10)}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-[110] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center backdrop-blur-2xl bg-leo-dark/40 border-b border-white/5">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center border border-white/10" style={{ backgroundColor: `${product.color}10`, color: product.color }}>
            {React.cloneElement(product.icon, { size: 20 })}
          </div>
          <span className="font-display font-black tracking-tighter text-lg md:text-2xl text-white uppercase">{product.name}</span>
        </div>
        
        {/* System Console Blip */}
        <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5 font-mono text-[9px] text-white/20">
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>SYS_READY</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <motion.span
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            LATENCY: 0.002ms
          </motion.span>
          <div className="w-px h-3 bg-white/10" />
          <motion.span
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            CORE_SYNC: 99.9%
          </motion.span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={product.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            Launch Engine <ExternalLink size={12} />
          </a>
          <button 
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>
      </nav>

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 md:mb-32 relative">
          {/* Neural Stream Illusion */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-current to-transparent"
                style={{ 
                  color: product.color,
                  width: Math.random() * 400 + 200,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  x: [-1000, 2000],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 10, 
                  repeat: Infinity, 
                  delay: Math.random() * 10,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.color }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-white mb-6 md:mb-8 leading-[0.9]">
              THE FUTURE OF <br />
              <span className="leo-gradient" style={{ backgroundImage: `linear-gradient(to right, white, ${product.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {product.name.split(' ').slice(1).join(' ') || product.name}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/50 font-light leading-relaxed mb-10 md:mb-12 max-w-xl">
              {product.details.overview}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-white text-leo-dark font-black uppercase tracking-widest text-[10px] sm:text-xs hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/5 flex items-center justify-center gap-2"
              >
                Launch Engine <ArrowRight size={16} />
              </a>
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white/10 transition-all duration-300">
                Technical Docs
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="relative h-96 md:aspect-square rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
            <ModuleVisualizer product={product} />
            
            {/* Status Indicators */}
            <div className="absolute top-8 left-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] font-mono text-white/60 uppercase tracking-widest">Neural Sync: Optimal</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-leo-purple animate-pulse" />
                <span className="text-[8px] font-mono text-white/60 uppercase tracking-widest">Edge Processing: Active</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deep Dive & Specs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info size={120} style={{ color: product.color }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-white/20 rounded-full" />
              TECHNICAL DEEP DIVE
            </h3>
            <p className="text-lg md:text-xl text-white/40 leading-relaxed font-light italic mb-12">
              {product.details.deepDive}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-sm font-display font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
                <Zap size={18} style={{ color: product.color }} />
                Advanced Operational Flow
              </h4>
              <p className="text-base text-white/60 leading-relaxed font-light">
                {product.details.howItWorks}
              </p>
              
              {/* Animated Flow Indicator */}
              <div className="mt-8 flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full"
                    style={{ backgroundColor: product.color }}
                    animate={{ 
                      opacity: [0.2, 1, 0.2],
                      width: [4, 24, 4]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl"
          >
            <h3 className="text-xl font-display font-black text-white mb-10 tracking-widest uppercase">SYSTEM SPECS</h3>
            <div className="space-y-8">
              {Object.entries(product.details.specs).map(([key, value], i) => (
                <div key={i} className="group">
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 group-hover:text-white/40 transition-colors">{key}</div>
                  <div className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform origin-left flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    {value as string}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4 tracking-tighter">CORE CAPABILITIES</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.details.capabilities.map((cap: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/10" style={{ color: product.color }}>
                  <Zap size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">{cap}</h4>
                <p className="text-sm text-white/30 font-light leading-relaxed">Proprietary neural architecture optimized for {cap.toLowerCase()} with zero-latency edge execution.</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works Section */}
        {product.name === 'VayuMind AI' && (
          <div className="mb-24 md:mb-32">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10" style={{ color: product.color }}>
                    <Layers size={24} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase">How it Works</h2>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">The Neural Mirroring™ Algorithm</h3>
                <p className="text-lg text-white/50 font-light leading-relaxed mb-8">
                  Neural Mirroring is a breakthrough in cognitive synchronization. By analyzing real-time EEG patterns at the edge, VayuMind creates a dynamic feedback loop that mirrors your brain's alpha-wave state.
                </p>

                <div className="space-y-6 mb-10">
                  {[
                    { icon: <Waves size={18} />, title: "Alpha Coupling", desc: "Synchronizes visual stimuli with your brain's natural 8-12Hz frequency." },
                    { icon: <Fingerprint size={18} />, title: "Biometric Feedback", desc: "Adjusts pattern complexity based on real-time cognitive load." },
                    { icon: <Activity size={18} />, title: "Hyper-Flow Induction", desc: "Maintains the optimal 'flow' state for extended deep-work sessions." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="mt-1 text-white/20 group-hover/item:text-white transition-colors" style={{ color: i === 0 ? product.color : undefined }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                        <p className="text-sm text-white/30 font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <NeuralMirroringVisualizer color={product.color} />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-leo-purple/20 blur-[60px] rounded-full pointer-events-none" />
              </motion.div>
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div className="p-8 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute -top-24 -right-24 w-96 h-96 blur-[120px] opacity-20 transition-colors duration-1000" style={{ backgroundColor: product.color }} />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-16 tracking-tighter">INDUSTRY APPLICATIONS</h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              {product.details.useCases.map((useCase: string, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 group/item"
                >
                  <div className="mt-2 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-white/30 transition-all group-hover/item:rotate-12" style={{ color: product.color }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover/item:translate-x-2 transition-transform duration-300">{useCase}</h4>
                    <p className="text-white/40 font-light leading-relaxed">Implementing autonomous {useCase.toLowerCase()} strategies through decentralized intelligence nodes and real-time pattern synthesis.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Action */}
        <div className="mt-24 text-center">
          <motion.a 
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 rounded-3xl bg-white text-leo-dark font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:shadow-white/20 transition-all"
          >
            Launch {product.name} <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
