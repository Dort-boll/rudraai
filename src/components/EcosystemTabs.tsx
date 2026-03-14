import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Terminal } from 'lucide-react';

interface Product {
  name: string;
  category: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  color: string;
  details: {
    overview: string;
    capabilities: string[];
    specs: Record<string, string>;
    useCases: string[];
  };
}

interface EcosystemTabsProps {
  products: Product[];
  activeTab?: number;
  setActiveTab?: (index: number) => void;
}

const Typewriter = ({ text, speed = 15 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="font-sans">
      {displayedText}
      {index < text.length && <span className="animate-pulse inline-block w-1 h-5 bg-leo-purple ml-1 align-middle" />}
    </span>
  );
};

const ProductVisualizer = ({ product }: { product: Product }) => {
  const particles = React.useMemo(() => [...Array(20)].map(() => ({
    x: [Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150],
    y: [Math.random() * 150 - 75, Math.random() * 150 - 75, Math.random() * 150 - 75],
    duration: Math.random() * 8 + 7
  })), [product.name]);

  const ideDots = React.useMemo(() => [...Array(64)].map(() => ({
    opacity: [0.05, Math.random() * 0.5 + 0.2, 0.05],
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2
  })), [product.name]);

  const threatDots = React.useMemo(() => [...Array(12)].map(() => ({
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 90 + 5}%`,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2
  })), [product.name]);

  switch (product.name) {
    case 'VayuMind AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full shadow-[0_0_15px_currentColor] will-change-transform"
              style={{ backgroundColor: product.color, color: product.color }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div 
            className="w-32 h-32 rounded-full blur-[40px] opacity-50 will-change-transform"
            style={{ backgroundColor: product.color }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      );
    case 'Vayu Research AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full border border-white/10 will-change-transform"
              style={{ borderColor: `${product.color}40` }}
              animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
              transition={{ duration: 10 * i, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: product.color, color: product.color }} />
            </motion.div>
          ))}
          <div className="w-16 h-16 rounded-full blur-[20px]" style={{ backgroundColor: product.color }} />
        </div>
      );
    case 'BioMind AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-full opacity-80 shadow-[0_0_10px_currentColor] will-change-transform"
              style={{ backgroundColor: product.color, color: product.color }}
              animate={{ height: [10, 100, 10] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      );
    case 'GenAI Doctor':
      return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-32 opacity-80" viewBox="0 0 500 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 L150,50 L170,20 L200,90 L230,10 L260,70 L280,50 L500,50"
              fill="none"
              stroke={product.color}
              strokeWidth="4"
              style={{ filter: `drop-shadow(0 0 8px ${product.color})` }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      );
    case 'Vayu IDE':
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full h-full grid grid-cols-8 gap-2 opacity-60">
            {ideDots.map((dot, i) => (
              <motion.div
                key={i}
                className="rounded-sm will-change-transform"
                style={{ backgroundColor: product.color }}
                animate={{ opacity: dot.opacity }}
                transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay }}
              />
            ))}
          </div>
        </div>
      );
    case 'Vayu Creative Studio':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-48 h-48 mix-blend-screen blur-[20px] will-change-transform"
            style={{ backgroundColor: product.color }}
            animate={{
              borderRadius: ["20%", "50%", "30%", "50%", "20%"],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 0.8, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-40 h-40 mix-blend-screen blur-[15px] will-change-transform"
            style={{ backgroundColor: "#fbbf24" }}
            animate={{
              borderRadius: ["50%", "20%", "50%", "30%", "50%"],
              rotate: [360, 270, 180, 90, 0],
              scale: [0.8, 1.1, 1, 1.2, 0.8]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      );
    case 'Spark AI':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 will-change-transform"
              style={{ borderColor: product.color }}
              animate={{
                width: [0, 400],
                height: [0, 400],
                opacity: [0.8, 0]
              }}
              transition={{ duration: 4, delay: i * 1.33, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <div className="w-4 h-4 rounded-full shadow-[0_0_20px_currentColor]" style={{ backgroundColor: product.color, color: product.color }} />
        </div>
      );
    case 'Vayu IDS':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
              <motion.polygon
                points="50,5 95,25 95,75 50,95 5,75 5,25"
                fill="none"
                stroke={product.color}
                strokeWidth="2"
                animate={{ strokeDasharray: ["0, 300", "300, 0"], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </svg>
            <motion.div
              className="absolute w-full h-1 blur-[2px] will-change-transform"
              style={{ backgroundColor: product.color }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      );
    case 'Threat Map':
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-32 border border-white/10 rounded-full overflow-hidden opacity-60">
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ backgroundImage: `radial-gradient(circle at center, ${product.color}20 0%, transparent 70%)` }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {threatDots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] will-change-transform"
                style={{ 
                  backgroundColor: product.color, color: product.color,
                  left: dot.left,
                  top: dot.top
                }}
                animate={{ scale: [1, 2, 1], opacity: [0.2, 1, 0.2] }}
                transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay }}
              />
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="w-[400px] h-[400px] rounded-full blur-[120px] will-change-transform"
            style={{ backgroundColor: product.color }}
          />
        </div>
      );
  }
};

export default function EcosystemTabs({ products, activeTab: externalActiveTab, setActiveTab: setExternalActiveTab }: EcosystemTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  const setActiveTab = setExternalActiveTab || setInternalActiveTab;

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'capabilities' | 'use-cases' | 'specs'>('overview');
  const activeProduct = products[activeTab];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4 flex flex-col gap-3">
          <div className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 mb-2">Intelligence Models</div>
          {products.map((product, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                setActiveSubTab('overview');
              }}
              className={`group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 text-left ${
                activeTab === index 
                  ? 'bg-white/5 border border-white/10 shadow-[0_0_30px_-10px_rgba(124,58,237,0.3)]' 
                  : 'hover:bg-white/5 border border-transparent opacity-40 hover:opacity-100 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
              }`}
            >
              <div 
                className={`p-3 rounded-xl bg-leo-dark/50 border border-white/5 transition-all duration-500 ${activeTab === index ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-3'}`}
                style={{ color: activeTab === index ? product.color : 'inherit' }}
              >
                {React.cloneElement(product.icon as React.ReactElement<any>, { size: 20 })}
              </div>
              <div className="overflow-hidden">
                <div className={`text-sm font-bold truncate transition-colors ${activeTab === index ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {product.name}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-30 font-medium truncate group-hover:opacity-50 transition-opacity duration-300">
                  {product.category}
                </div>
              </div>
              {activeTab === index && (
                <motion.div
                  layoutId="active-node-glow"
                  className="absolute inset-0 rounded-2xl border border-leo-purple/30 pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4 min-h-[700px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="glass-panel p-10 md:p-14 h-full flex flex-col relative overflow-hidden"
            >
              {/* Background Atmospheric Glow */}
              <div 
                className="absolute -right-40 -top-40 w-[500px] h-[500px] blur-[180px] opacity-[0.15] pointer-events-none"
                style={{ backgroundColor: activeProduct.color }}
              />

              {/* Sub-Navigation (Leonardo Style) */}
              <div className="flex gap-10 mb-14 border-b border-white/5 pb-6">
                {(['overview', 'capabilities', 'use-cases', 'specs'] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubTab(sub)}
                    className={`relative text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                      activeSubTab === sub ? 'text-white' : 'text-white/20 hover:text-white/50'
                    }`}
                  >
                    {sub.replace('-', ' ')}
                    {activeSubTab === sub && (
                      <motion.div
                        layoutId="subtab-indicator"
                        className="absolute -bottom-[25px] left-0 right-0 h-[3px] bg-leo-purple rounded-full shadow-[0_0_15px_rgba(124,58,237,0.8)]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {activeSubTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-8">
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl">
                          {React.cloneElement(activeProduct.icon as React.ReactElement<any>, { size: 56 })}
                        </div>
                        <div>
                          <h3 className="text-6xl font-display font-black tracking-tight mb-3 leo-gradient">
                            {activeProduct.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-leo-purple/10 border border-leo-purple/20 text-[10px] font-bold text-leo-purple uppercase tracking-widest">
                              {activeProduct.category}
                            </span>
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
                              v4.2.0-stable
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl">
                        <Typewriter text={activeProduct.details.overview} />
                      </div>

                      {/* Visual Showcase */}
                      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-leo-dark/40 border border-white/5 group hover:border-leo-purple/30 transition-colors duration-500">
                        <ProductVisualizer product={activeProduct} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="z-10 text-center">
                            <div className="text-white/5 font-display text-[12rem] font-black uppercase tracking-tighter mb-4 select-none group-hover:scale-105 transition-transform duration-700">
                              {activeProduct.name.split(' ')[0]}
                            </div>
                            <div className="flex gap-6 justify-center">
                              {[1, 2, 3, 4, 5].map(i => (
                                <motion.div
                                  key={i}
                                  animate={{ height: [15, 45, 15] }}
                                  transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                                  className="w-1.5 bg-leo-purple/30 rounded-full group-hover:bg-leo-purple/60 transition-colors duration-500"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 group-hover:border-leo-purple/30 group-hover:bg-leo-purple/10 transition-all duration-500">
                          <div className="w-2 h-2 rounded-full bg-leo-purple animate-pulse group-hover:scale-150 transition-transform duration-500" />
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-white/80 transition-colors duration-500">Neural Engine Active</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSubTab === 'capabilities' && (
                    <motion.div
                      key="capabilities"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      {activeProduct.details.capabilities.map((cap, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="leo-card p-8 group hover:bg-white/10 hover:border-leo-purple/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
                        >
                          <div className="flex items-start gap-6">
                            <div className="mt-1.5 w-3 h-3 rounded-full bg-leo-purple shadow-[0_0_15px_rgba(124,58,237,0.8)] group-hover:scale-150 group-hover:bg-white transition-all duration-500" />
                            <p className="text-xl text-white/90 leading-snug font-medium group-hover:text-white transition-colors duration-300">{cap}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeSubTab === 'use-cases' && (
                    <motion.div
                      key="use-cases"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {activeProduct.details.useCases.map((useCase, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between group hover:border-leo-purple/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                        >
                          <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 group-hover:text-leo-purple transition-colors duration-300">Case 0{i+1}</div>
                          <p className="text-lg text-white/80 font-medium leading-tight group-hover:text-white transition-colors duration-300">{useCase}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeSubTab === 'specs' && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {Object.entries(activeProduct.details.specs).map(([key, value], i) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 hover:border-leo-purple/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:scale-[1.02]"
                        >
                          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors duration-300">{key}</span>
                          <span className="font-mono text-leo-purple font-black text-lg group-hover:text-white group-hover:scale-110 transition-all duration-500 origin-right">{value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Area */}
              <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-leo-dark bg-white/10 flex items-center justify-center text-[11px] font-bold text-white/40">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Global Deployment</span>
                    <span className="text-sm font-bold text-white/60">14.2k Active Instances</span>
                  </div>
                </div>
                <a
                  href={activeProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-white text-leo-dark font-black uppercase tracking-[0.2em] text-[11px] hover:bg-leo-purple hover:text-white hover:scale-105 transition-all duration-500 group shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] relative overflow-hidden"
                >
                  <span className="relative z-10">Enter Experience</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
