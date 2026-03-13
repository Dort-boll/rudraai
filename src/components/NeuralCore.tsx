import React, { useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Points, PointMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Core({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * (hovered ? 0.4 : 0.2);
      meshRef.current.rotation.y = state.clock.getElapsedTime() * (hovered ? 0.6 : 0.3);
      
      // Pulse scale on hover
      const targetScale = hovered ? 2.6 + Math.sin(state.clock.getElapsedTime() * 5) * 0.1 : 2.4;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (groupRef.current) {
      // Smoothly rotate the entire core group towards the mouse pointer
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-state.pointer.y * Math.PI) / 4, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={hovered ? 4 : 2} rotationIntensity={hovered ? 2 : 1} floatIntensity={hovered ? 3 : 2}>
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
          <MeshDistortMaterial
            color={hovered ? "#a78bfa" : "#7c3aed"}
            attach="material"
            distort={hovered ? 0.6 : 0.4}
            speed={hovered ? 8 : 4}
            roughness={0.2}
            metalness={0.8}
            emissive={hovered ? "#7c3aed" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </Sphere>
        
        {/* Outer Glow Sphere */}
        <mesh scale={[2.6, 2.6, 2.6]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color={hovered ? "#818cf8" : "#4f46e5"} wireframe transparent opacity={hovered ? 0.15 : 0.05} />
        </mesh>

        {/* Optical Illusion Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.4, 0.005, 16, 100]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 1500, hovered = false }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * (hovered ? 0.08 : 0.03);
      // Add subtle parallax to particles
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.pointer.x * (hovered ? 1 : 0.5), 0.02);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.pointer.y * (hovered ? 1 : 0.5), 0.02);
      
      if (materialRef.current) {
        materialRef.current.size = THREE.MathUtils.lerp(materialRef.current.size, hovered ? 0.025 : 0.015, 0.1);
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, hovered ? 0.8 : 0.4, 0.1);
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#7c3aed"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

export default function NeuralCore() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-[600px] md:h-[800px] relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        <spotLight position={[0, 5, 0]} intensity={2} color="#fbbf24" />
        
        <Core hovered={hovered} />
        <Particles hovered={hovered} />
      </Canvas>
      
      {/* Hover Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="glass-panel p-10 min-w-[340px] text-center bg-leo-dark/80 border-leo-purple/50 shadow-[0_0_80px_rgba(124,58,237,0.6)] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-leo-purple/20 via-transparent to-leo-indigo/20 opacity-50" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
              <div className="relative z-10">
                <h3 className="text-4xl font-display font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-leo-purple to-leo-indigo tracking-tighter drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">VAYU CORE</h3>
                <div className="space-y-5">
                  {[
                    { label: "Processing", value: "20.98 PB/s", color: "text-leo-purple" },
                    { label: "Architecture", value: "Decentralized", color: "text-leo-indigo" },
                    { label: "Deployment", value: "Edge-Native", color: "text-leo-gold" }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3 group/stat">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover/stat:text-white/80 transition-colors duration-300">{stat.label}</span>
                      <span className={`text-sm font-mono font-bold ${stat.color} group-hover/stat:scale-110 transition-transform duration-300 origin-right`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex gap-1.5 justify-center">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 20, 4], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 bg-gradient-to-t from-leo-purple to-leo-indigo rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform duration-1000" style={{ scale: hovered ? 1.05 : 1 }}>
        <div className={`w-[500px] h-[500px] rounded-full border border-white/5 animate-[spin_25s_linear_infinite] transition-colors duration-1000 ${hovered ? 'border-leo-purple/20 shadow-[0_0_30px_rgba(124,58,237,0.1)_inset]' : ''}`} />
        <div className={`absolute w-[650px] h-[650px] rounded-full border border-leo-purple/5 animate-[spin_40s_linear_infinite_reverse] transition-colors duration-1000 ${hovered ? 'border-leo-indigo/20 shadow-[0_0_40px_rgba(79,70,229,0.1)_inset]' : ''}`} />
      </div>
    </div>
  );
}
