import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Globe, Zap, Shield, Activity, Smartphone, Server } from 'lucide-react';

export default function EdgeIntelligenceDemo() {
  const [activeTab, setActiveTab] = useState<'edge' | 'cloud'>('edge');

  return (
    <section className="py-24 md:py-40 px-4 sm:px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-leo-purple/10 border border-leo-purple/20 text-leo-purple text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <Activity size={14} />
            On-Device Autonomy
          </motion.div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black mb-8 tracking-tighter leo-gradient">
            EDGE INTELLIGENCE
          </h2>
          <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
            Vayu AGI doesn't rely on centralized servers. It processes complex neural logic directly on your hardware, ensuring zero latency and absolute privacy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Demo */}
          <div className="relative aspect-square rounded-[3rem] bg-white/[0.02] border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />
            
            {/* Central Device */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: activeTab === 'edge' ? [1, 1.05, 1] : 1,
                  boxShadow: activeTab === 'edge' ? [
                    "0 0 20px rgba(124,58,237,0.2)",
                    "0 0 40px rgba(124,58,237,0.4)",
                    "0 0 20px rgba(124,58,237,0.2)"
                  ] : "0 0 0px rgba(0,0,0,0)"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-80 rounded-[2.5rem] bg-leo-dark border-4 border-white/10 relative overflow-hidden flex flex-col items-center p-6"
              >
                <div className="w-12 h-1 bg-white/10 rounded-full mb-8" />
                <Cpu size={48} className={activeTab === 'edge' ? "text-leo-purple" : "text-white/10"} />
                
                {/* Neural Activity Simulation */}
                <div className="mt-12 w-full space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={activeTab === 'edge' ? {
                          x: ["-100%", "100%"],
                          backgroundColor: ["#7c3aed", "#4f46e5", "#7c3aed"]
                        } : { x: "-100%" }}
                        transition={{ duration: 1.5 + i * 0.5, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/2"
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-8 text-[8px] font-mono text-white/20 uppercase tracking-widest">
                  {activeTab === 'edge' ? "Local Synthesis Active" : "Standby Mode"}
                </div>
              </motion.div>
            </div>

            {/* Cloud Nodes (Only visible/active in cloud mode) */}
            <AnimatePresence>
              {activeTab === 'cloud' && (
                <>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                      style={{
                        top: i < 2 ? '10%' : '80%',
                        left: i % 2 === 0 ? '10%' : '80%'
                      }}
                    >
                      <Server size={24} className="text-white/40" />
                      {/* Data Lines to Cloud */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                        <motion.line 
                          x1="50%" y1="50%" 
                          x2={i % 2 === 0 ? "200%" : "-100%"} 
                          y2={i < 2 ? "200%" : "-100%"}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          animate={{ strokeDashoffset: [0, -20] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Comparison Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
              <button 
                onClick={() => setActiveTab('edge')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'edge' ? 'bg-leo-purple text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]' : 'bg-white/5 text-white/40 border border-white/10'}`}
              >
                Edge Mode
              </button>
              <button 
                onClick={() => setActiveTab('cloud')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'cloud' ? 'bg-white text-leo-dark' : 'bg-white/5 text-white/40 border border-white/10'}`}
              >
                Cloud Mode
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">
                {activeTab === 'edge' ? "Zero Latency. Total Privacy." : "The Cloud Bottleneck"}
              </h3>
              <p className="text-lg text-white/40 font-light leading-relaxed">
                {activeTab === 'edge' 
                  ? "By running neural models directly on your device's NPU, Vayu AGI eliminates the need for data to travel to a server. This results in sub-millisecond response times and ensures your data never leaves your possession."
                  : "Traditional AI sends your private data to massive data centers. This creates latency, consumes bandwidth, and introduces significant privacy risks as your information is processed on third-party hardware."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Latency", edge: "< 1ms", cloud: "250ms+", icon: <Zap size={16} /> },
                { label: "Privacy", edge: "Absolute", cloud: "Exposed", icon: <Shield size={16} /> },
                { label: "Bandwidth", edge: "Zero", cloud: "High", icon: <Activity size={16} /> },
                { label: "Autonomy", edge: "Full", cloud: "Dependent", icon: <Globe size={16} /> }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 text-white/20 mb-4">
                    {stat.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className={`text-xl font-black ${activeTab === 'edge' ? 'text-leo-purple' : 'text-white/60'}`}>
                    {activeTab === 'edge' ? stat.edge : stat.cloud}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
