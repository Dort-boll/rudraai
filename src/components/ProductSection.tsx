import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Send, Sparkles, Image as ImageIcon, Video, Type, Info } from 'lucide-react';
import HypnoticPattern from './HypnoticPattern';

interface ProductSectionProps {
  product: any;
  index: number;
  onSelect: () => void;
}

const CreativeStudioDemo = ({ color }: { color: string }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputType, setOutputType] = useState<'image' | 'video' | 'text'>('image');
  const [showResult, setShowResult] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setShowResult(false);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-8 relative z-20">
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-3xl bg-black/40 border border-white/5 group/demo">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-20 h-20">
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-leo-purple"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-2 rounded-full border-2 border-transparent border-t-leo-indigo"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles className="absolute inset-0 m-auto text-leo-gold animate-pulse" size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 animate-pulse">Synthesizing Reality...</p>
            </motion.div>
          ) : showResult ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              className="w-full h-full relative group/result"
            >
              {outputType === 'image' && (
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${prompt}/800/800`} 
                    alt="Generated" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/result:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/result:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              {outputType === 'video' && (
                <div className="w-full h-full bg-gradient-to-br from-leo-purple/20 to-leo-indigo/20 flex items-center justify-center overflow-hidden">
                  <motion.div 
                    className="w-32 h-32 rounded-full blur-3xl"
                    style={{ backgroundColor: color }}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                      x: [0, 50, -50, 0],
                      y: [0, -50, 50, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <Video size={48} className="text-white/40 relative z-10" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/60 uppercase tracking-widest">Rendering Cinematic Sequence</span>
                  </div>
                </div>
              )}
              {outputType === 'text' && (
                <div className="p-8 text-white/80 font-light leading-relaxed italic text-lg text-center">
                  "{prompt}" - A masterpiece of digital consciousness, woven from the threads of neural architecture and creative spark.
                </div>
              )}
              <motion.button 
                onClick={() => setShowResult(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Sparkles size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6 text-center px-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/demo:scale-110 group-hover/demo:rotate-3 transition-all duration-500">
                <Sparkles size={32} className="text-leo-gold" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-white mb-2">Creative Canvas</h4>
                <p className="text-sm text-white/40 leading-relaxed">Type a prompt below to see the engine in action. Experience the fusion of art and AGI.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-2">
          {[
            { id: 'image', icon: ImageIcon, label: 'Image' },
            { id: 'video', icon: Video, label: 'Video' },
            { id: 'text', icon: Type, label: 'Story' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setOutputType(type.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all duration-300 text-[10px] font-bold uppercase tracking-widest ${
                outputType === type.id 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              <type.icon size={14} />
              <span className="hidden sm:inline">{type.label}</span>
            </button>
          ))}
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Describe your vision..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 pr-14"
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-leo-purple text-white hover:bg-leo-indigo disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-leo-purple/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductVisualizer = ({ product }: { product: any }) => {
  const lines = React.useMemo(() => [...Array(15)].map(() => ({
    x2: [Math.random() * 800, Math.random() * 800],
    y2: [Math.random() * 800, Math.random() * 800],
    duration: 10 + Math.random() * 5
  })), [product.name]);

  const particles = React.useMemo(() => [...Array(30)].map(() => ({
    x: [Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300],
    y: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
    duration: Math.random() * 10 + 10
  })), [product.name]);

  switch (product.name) {
    case 'Vayu Creative Studio':
      return <CreativeStudioDemo color={product.color} />;
    case 'VayuMind AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 800">
            {lines.map((line, i) => (
              <motion.line
                key={i}
                x1={400}
                y1={400}
                x2={line.x2[0]}
                y2={line.y2[0]}
                stroke={product.color}
                strokeWidth="1"
                animate={{
                  x2: line.x2,
                  y2: line.y2,
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: line.duration, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full shadow-[0_0_20px_currentColor] will-change-transform"
              style={{ backgroundColor: product.color, color: product.color }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div 
            className="w-48 h-48 rounded-full blur-[60px] opacity-30 will-change-transform"
            style={{ backgroundColor: product.color }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
      );
    case 'Vayu Research AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 will-change-transform"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: `0 0 20px ${product.color}` }}
            />
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-[70%] max-w-[350px] aspect-square rounded-full border border-white/10 will-change-transform"
                style={{ borderColor: `${product.color}40` }}
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 10 * i, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: product.color, color: product.color }} />
              </motion.div>
            ))}
            <div className="w-24 h-24 rounded-full blur-[30px] opacity-40" style={{ backgroundColor: product.color }} />
          </div>
        </div>
      );
    case 'BioMind AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4 sm:gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <motion.div
                  className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: product.color, color: product.color }}
                  animate={{ y: [0, 100, 0], scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: "#ffffff40", color: "#ffffff40" }}
                  animate={{ y: [100, 0, 100], scale: [1.5, 1, 1.5] }}
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    case 'GenAI Doctor':
      return (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-8">
          <div className="w-full h-48 relative overflow-hidden">
            <svg className="w-full h-full opacity-40" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <motion.path
                d="M0,100 L200,100 L220,40 L260,160 L300,100 L500,100 L520,20 L560,180 L600,100 L1000,100"
                fill="none"
                stroke={product.color}
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <motion.div 
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ left: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              >
                <div className="w-6 h-1 bg-white/20 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'Vayu IDE':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full rounded-2xl bg-black/40 border border-white/5 overflow-hidden relative font-mono text-[10px] p-4 text-leo-purple/40">
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute whitespace-nowrap"
                  style={{ left: `${i * 5}%`, top: -20 }}
                  animate={{ top: ["0%", "110%"] }}
                  transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                >
                  {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
                </motion.div>
              ))}
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {`> INITIALIZING NEURAL_CORE...`}
              </motion.div>
              <div>{`> LOADING ASSETS...`}</div>
              <div className="text-white/20">{`> COMPILING SHADERS...`}</div>
              <div className="text-leo-gold/40">{`> STATUS: OPTIMAL`}</div>
            </div>
          </div>
        </div>
      );
    case 'Vayu Creative Studio':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[80%] max-w-[384px] aspect-square mix-blend-screen blur-[40px]"
            style={{ backgroundColor: product.color }}
            animate={{
              borderRadius: ["20%", "50%", "30%", "50%", "20%"],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.4, 0.8, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[60%] max-w-[320px] aspect-square mix-blend-screen blur-[30px]"
            style={{ backgroundColor: "#fbbf24" }}
            animate={{
              borderRadius: ["50%", "20%", "50%", "30%", "50%"],
              rotate: [360, 270, 180, 90, 0],
              scale: [0.8, 1.2, 1, 1.4, 0.8]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case 'Spark AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: product.color, color: product.color }}
              animate={{
                x: [0, (Math.random() - 0.5) * 400],
                y: [0, (Math.random() - 0.5) * 400],
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/20"
              style={{ borderColor: `${product.color}40` }}
              animate={{
                width: ["0%", "180%"],
                height: ["0%", "180%"],
                opacity: [0.8, 0],
                rotate: [0, 90]
              }}
              transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <div className="w-12 h-12 rounded-full shadow-[0_0_50px_currentColor] bg-white flex items-center justify-center" style={{ color: product.color }}>
            <Zap size={24} fill="currentColor" />
          </div>
        </div>
      );
    case 'Vayu IDS':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[80%] max-w-[400px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.polygon
                points="50,5 95,25 95,75 50,95 5,75 5,25"
                fill="none"
                stroke={product.color}
                strokeWidth="1"
                className="opacity-20"
              />
              <motion.polygon
                points="50,5 95,25 95,75 50,95 5,75 5,25"
                fill="none"
                stroke={product.color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full border border-red-500/50"
                  style={{ 
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                  animate={{ scale: [0, 2], opacity: [1, 0] }}
                  transition={{ duration: 2, delay: i * 0.8, repeat: Infinity }}
                />
              ))}
            </div>
            <motion.div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[2px]"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      );
    case 'Threat Map':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[90%] max-w-[600px] aspect-[2/1] border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-md">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            {[...Array(8)].map((_, i) => {
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              const endX = Math.random() * 100;
              const endY = Math.random() * 100;
              return (
                <div key={i} className="absolute inset-0">
                  <motion.div
                    className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]"
                    initial={{ left: `${startX}%`, top: `${startY}%` }}
                    animate={{ left: `${endX}%`, top: `${endY}%`, opacity: [0, 1, 0] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-10">
                    <line x1={`${startX}%`} y1={`${startY}%`} x2={`${endX}%`} y2={`${endY}%`} stroke={product.color} strokeWidth="1" />
                  </svg>
                </div>
              );
            })}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Global Threat Detection Active</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="w-[150%] max-w-[600px] aspect-square rounded-full blur-[100px] sm:blur-[160px]"
            style={{ backgroundColor: product.color }}
          />
        </div>
      );
  }
};

export default function ProductSection({ product, index, onSelect }: ProductSectionProps) {
  const isEven = index % 2 === 0;
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    requestAnimationFrame(() => {
      x.set(xPct);
      y.set(yPct);
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="relative min-h-screen py-20 md:py-32 px-4 md:px-6 flex items-center overflow-hidden border-b border-white/5 bg-black"
    >
      {/* Hypnotic Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <HypnoticPattern color={product.color} type={product.pattern} />
      </div>

      {/* Optical Illusion Overlay: Scintillating Grid */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${product.color}20, transparent)` }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group/icon" style={{ color: product.color }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                {React.cloneElement(product.icon, { size: 28, className: "sm:w-8 sm:h-8 relative z-10 group-hover/icon:scale-110 transition-transform duration-500" })}
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] mb-1 opacity-60" style={{ color: product.color }}>
                  {product.category}
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter text-white">
                  {product.name}
                </h2>
              </div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white/40 leading-relaxed font-light mb-10 md:mb-12 group-hover:text-white/60 transition-colors duration-500">
              {product.details.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 md:mb-12">
              {product.details.capabilities.map((cap: string, i: number) => (
                <div key={i} className="flex items-start gap-3 group/cap p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <CheckCircle2 size={18} className="mt-1 flex-shrink-0 sm:w-5 sm:h-5 group-hover/cap:scale-125 group-hover/cap:rotate-12 transition-all duration-500" style={{ color: product.color }} />
                  <span className="text-sm sm:text-base text-white/60 font-medium group-hover/cap:text-white transition-colors duration-300">{cap}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {Object.entries(product.details.specs).map(([key, value], i) => (
                <div key={i} className="px-4 py-2.5 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 cursor-default group/spec hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="relative z-10 text-[8px] sm:text-[9px] uppercase tracking-widest text-white/30 mb-1 group-hover/spec:text-white/60 transition-colors duration-300">{key}</div>
                  <div className="relative z-10 text-xs sm:text-sm font-bold text-white/80 group-hover/spec:text-white group-hover/spec:scale-105 transition-all duration-500 origin-left">{value as string}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-10 md:mt-12">
              <motion.button 
                onClick={onSelect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white/10 hover:border-white/30 group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: product.color }} />
                <span className="relative z-10 flex items-center gap-3">
                  Technical Deep Dive <Info size={16} className="group-hover:rotate-12 transition-transform duration-500" />
                </span>
              </motion.button>

              <motion.a 
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-leo-dark font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: product.color }} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center gap-3">
                  Access Engine <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Visualizer Container */}
          <motion.div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="flex-1 w-full aspect-square max-w-[500px] lg:max-w-[600px] mx-auto relative rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] mt-8 lg:mt-0 group will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 translate-z-0">
              <ProductVisualizer product={product} />
            </div>
            
            {/* Overlay UI Elements */}
            <div style={{ transform: "translateZ(80px)" }} className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 translate-z-0">
              <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: product.color, color: product.color }} />
              <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest group-hover:text-white/90 transition-colors duration-300">Neural Sync</span>
            </div>
            
            <div style={{ transform: "translateZ(80px)" }} className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 translate-z-0">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={14} style={{ color: product.color }} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">Primary Use Cases</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.details.useCases.slice(0, 3).map((useCase: string, i: number) => (
                  <span key={i} className="px-2 py-1 rounded-lg bg-white/5 text-[10px] text-white/60 border border-white/5 group-hover:bg-white/10 group-hover:text-white/80 transition-all duration-300">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
