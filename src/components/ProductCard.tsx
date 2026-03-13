import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface ProductProps {
  name: string;
  category: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  color: string;
}

export default function ProductCard({ name, category, description, link, icon, color }: ProductProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-panel p-8 flex flex-col h-full group relative overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500"
    >
      <div 
        className="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-60 group-hover:scale-150"
        style={{ backgroundColor: color }}
      />
      
      <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ color }}>
        {icon}
      </div>
      
      <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ color }}>
        {category}
      </div>
      
      <h3 className="text-2xl font-display font-bold mb-4 group-hover:translate-x-2 transition-transform duration-500" style={{ color }}>
        {name}
      </h3>
      
      <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow group-hover:text-white/80 transition-colors duration-500">
        {description}
      </p>
      
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-bold group/link w-fit"
        style={{ color }}
      >
        <span className="relative">
          Launch Platform
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full" />
        </span>
        <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
      </a>
    </motion.div>
  );
}
