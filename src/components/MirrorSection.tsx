import React from 'react';

export default function MirrorSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Mirror Effect (Bottom Reflection) - Optimized */}
      <div 
        className="absolute top-full left-0 w-full h-full pointer-events-none opacity-20 scale-y-[-1] blur-sm will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
        {children}
      </div>
    </div>
  );
}
