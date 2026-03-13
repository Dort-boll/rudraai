import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Shield, Cpu, Globe } from 'lucide-react';

export default function SystemStatus() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    threats: 0,
    nodes: 14205,
    latency: 2.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.floor(Math.random() * 20) + 30,
        threats: Math.random() > 0.9 ? prev.threats + 1 : prev.threats,
        nodes: prev.nodes + Math.floor(Math.random() * 5),
        latency: parseFloat((Math.random() * 0.5 + 2.2).toFixed(1))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-6 px-8 py-3 rounded-full glass-panel border-white/5 bg-black/40 backdrop-blur-2xl scale-90 shadow-[0_0_30px_-10px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_-5px_rgba(124,58,237,0.6)] hover:border-leo-purple/40 hover:scale-95 hover:-translate-y-1 transition-all duration-500 cursor-default group/status"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-leo-purple/10 via-leo-indigo/10 to-leo-gold/10 opacity-0 group-hover/status:opacity-100 rounded-full transition-opacity duration-500" />
      <div className="absolute -inset-0.5 bg-gradient-to-r from-leo-purple to-leo-gold rounded-full blur opacity-0 group-hover/status:opacity-20 transition-opacity duration-500" />
      <div className="flex items-center gap-2 group relative z-10 cursor-pointer hover:bg-white/5 px-2 py-1 -mx-2 rounded-lg transition-colors duration-300">
        <Cpu size={14} className="text-leo-purple group-hover:rotate-180 transition-transform duration-700" />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors duration-300">Core:</span>
        <motion.span 
          key={metrics.cpu}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-mono text-white font-bold group-hover:text-leo-purple transition-colors duration-300"
        >
          {metrics.cpu}%
        </motion.span>
      </div>
      <div className="w-[1px] h-3 bg-white/10 relative z-10" />
      <div className="flex items-center gap-2 group relative z-10 cursor-pointer hover:bg-white/5 px-2 py-1 -mx-2 rounded-lg transition-colors duration-300">
        <Shield size={14} className={`transition-colors duration-300 ${metrics.threats > 0 ? 'text-red-500 animate-pulse' : 'text-leo-indigo group-hover:scale-125 group-hover:rotate-12'}`} />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors duration-300">Threats:</span>
        <motion.span 
          key={metrics.threats}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-[10px] font-mono font-bold transition-colors duration-300 ${metrics.threats > 0 ? 'text-red-500' : 'text-white group-hover:text-leo-indigo'}`}
        >
          {metrics.threats}
        </motion.span>
      </div>
      <div className="w-[1px] h-3 bg-white/10 relative z-10" />
      <div className="flex items-center gap-2 group relative z-10 cursor-pointer hover:bg-white/5 px-2 py-1 -mx-2 rounded-lg transition-colors duration-300">
        <Globe size={14} className="text-leo-gold group-hover:animate-spin" style={{ animationDuration: '2s' }} />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors duration-300">Nodes:</span>
        <motion.span 
          key={metrics.nodes}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-mono text-white font-bold group-hover:text-leo-gold transition-colors duration-300"
        >
          {metrics.nodes.toLocaleString()}
        </motion.span>
      </div>
      <div className="w-[1px] h-3 bg-white/10 relative z-10" />
      <div className="flex items-center gap-2 group relative z-10 cursor-pointer hover:bg-white/5 px-2 py-1 -mx-2 rounded-lg transition-colors duration-300">
        <Activity size={14} className="text-leo-purple group-hover:scale-125 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors duration-300">Latency:</span>
        <motion.span 
          key={metrics.latency}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] font-mono text-white font-bold group-hover:text-leo-purple transition-colors duration-300"
        >
          {metrics.latency}ms
        </motion.span>
      </div>
    </motion.div>
  );
}
