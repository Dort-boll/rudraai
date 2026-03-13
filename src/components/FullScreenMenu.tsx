import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
}

export default function FullScreenMenu({ isOpen, onClose, products }: FullScreenMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl overflow-y-auto"
        >
          <div className="min-h-screen p-6 sm:p-8 md:p-16 max-w-[1600px] mx-auto flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 md:mb-16">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-leo-purple to-leo-indigo flex items-center justify-center font-black text-xl md:text-2xl shadow-lg shadow-leo-purple/20">R</div>
                <span className="font-display font-black tracking-tighter text-2xl md:text-3xl">RUDRA</span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:rotate-90 transition-all duration-300"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 flex-grow">
              {/* Left Column: Navigation */}
              <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2 md:mb-4">Navigation</div>
                {['Home', 'Philosophy', 'Ecosystem'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter hover:text-leo-purple transition-colors w-fit relative group"
                  >
                    {item}
                    <span className="absolute -bottom-2 left-0 w-0 h-[4px] bg-leo-purple group-hover:w-full transition-all duration-500" />
                  </motion.a>
                ))}
              </div>

              {/* Right Column: Products */}
              <div className="lg:col-span-8">
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-8 md:mb-12">Vayu Intelligence Ecosystem</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {products.map((p, i) => (
                    <motion.a
                      key={i}
                      href={`#product-${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={onClose}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.3 }}
                      className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: p.color }} />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 rounded-xl bg-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" style={{ color: p.color }}>
                            {React.cloneElement(p.icon, { size: 20, className: "sm:w-6 sm:h-6" })}
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold tracking-wide group-hover:text-white transition-colors duration-300">{p.name}</h3>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors duration-300">{p.category}</div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 sm:mb-8 flex-grow group-hover:text-white/80 transition-colors duration-300">
                          {p.description}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform duration-300" style={{ color: p.color }}>
                          Explore Engine <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
