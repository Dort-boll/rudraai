/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  FlaskConical, 
  Dna, 
  Stethoscope, 
  Code2, 
  Palette, 
  Search, 
  ShieldAlert, 
  Globe,
  ChevronDown,
  Cpu,
  Lock,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react';
import NeuralCore from './components/NeuralCore';
import Background from './components/Background';
import NeuralCursor from './components/NeuralCursor';
import SystemStatus from './components/SystemStatus';
import FullScreenMenu from './components/FullScreenMenu';
import ProductSection from './components/ProductSection';
import ProductDetail from './components/ProductDetail';
import HypnoticPattern from './components/HypnoticPattern';
import InteractiveLogo from './components/InteractiveLogo';
import EdgeIntelligenceDemo from './components/EdgeIntelligenceDemo';
import MirrorSection from './components/MirrorSection';
import HypnoticPatternOverlay from './components/HypnoticPatternOverlay';

// Scramble Text Component
const ScrambleText = React.memo(({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if(index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 40);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
});

ScrambleText.displayName = 'ScrambleText';

const products = [
  {
    name: "VayuMind AI",
    category: "Cognitive Intelligence System",
    description: "Revolutionary brain development platform analyzing neurological patterns to identify hypnotic cognitive structures and enhance focus.",
    link: "https://vayumindai.pages.dev/",
    icon: <Brain />,
    color: "#7c3aed",
    pattern: "spiral",
    details: {
      overview: "VayuMind AI is the world's first decentralized cognitive enhancement platform. It uses edge-based neural monitoring to optimize human focus and mental clarity without cloud latency.",
      capabilities: [
        "Real-time cognitive load balancing",
        "Hypnotic pattern identification",
        "Neural focus optimization",
        "On-device privacy-first processing"
      ],
      specs: {
        "Neural Latency": "< 2.4ms",
        "Pattern Recognition": "99.98% Accuracy",
        "Encryption": "Quantum-Resistant",
        "Model Size": "14.2B Parameters"
      },
      useCases: [
        "High-performance focus training",
        "Neuro-feedback therapy",
        "Cognitive fatigue monitoring",
        "Deep-work optimization"
      ],
      deepDive: "The core engine of VayuMind utilizes a proprietary 'Neural Mirroring' algorithm that synchronizes with the user's alpha waves. By creating a feedback loop of visual and auditory stimuli, it induces a state of 'Hyper-Flow' where productivity increases by up to 300%. The system is entirely self-contained, ensuring that your most private thoughts and cognitive patterns never leave your local hardware.",
      howItWorks: "VayuMind utilizes a 'Neural Mirroring' protocol that synchronizes on-device neural processing with biological alpha-wave oscillations. By applying recursive Fast Fourier Transform (FFT) analysis to real-time EEG telemetry, it identifies cognitive resonance gaps and generates targeted auditory-visual stimuli to induce a state of sustained hyper-flow."
    }
  },
  {
    name: "Vayu Research AI",
    category: "Autonomous Scientific Research",
    description: "Fully autonomous AI research scientist exploring pharmaceutical science, engineering, and nuclear research through literature analysis.",
    link: "https://vayuresearch.pages.dev/",
    icon: <FlaskConical />,
    color: "#4f46e5",
    pattern: "moire",
    details: {
      overview: "An autonomous intelligence designed to accelerate human discovery. Vayu Research AI processes millions of scientific papers to synthesize new hypotheses in physics and chemistry.",
      capabilities: [
        "Autonomous hypothesis generation",
        "Cross-domain literature synthesis",
        "Predictive chemical modeling",
        "Nuclear safety simulation"
      ],
      specs: {
        "Processing Power": "20.98 PB/s",
        "Data Sources": "150M+ Papers",
        "Reasoning Depth": "Level 5 Autonomous",
        "Update Frequency": "Real-time"
      },
      useCases: [
        "Pharmaceutical drug discovery",
        "Materials science innovation",
        "Nuclear energy optimization",
        "Climate change modeling"
      ],
      deepDive: "Vayu Research AI operates on a 'Hyper-Graph' architecture, connecting disparate scientific fields that human researchers might never cross-reference. It recently predicted a new class of high-temperature superconductors by analyzing 40-year-old metallurgical data alongside modern quantum physics simulations. It is not just a tool; it is a peer-level researcher that works 24/7.",
      howItWorks: "Vayu Research AI employs a 'Hyper-Graph Semantic Synthesis' engine that maps multi-dimensional relationships across 150M+ scientific nodes. It utilizes autonomous reasoning agents to perform cross-domain literature triangulation, predicting novel hypotheses through high-fidelity quantum-mechanical simulations and graph-based relational learning."
    }
  },
  {
    name: "BioMind AI",
    category: "Biomedical Discovery System",
    description: "Advanced biomedical innovation engine designed for discovering new treatments, genetic analysis, and therapeutic strategies.",
    link: "https://biomindai.pages.dev/",
    icon: <Dna />,
    color: "#fbbf24",
    pattern: "tunnel",
    details: {
      overview: "BioMind AI bridges the gap between digital intelligence and biological systems. It specializes in protein folding, genetic sequencing, and personalized medicine discovery.",
      capabilities: [
        "Protein structure prediction",
        "Genetic mutation analysis",
        "Personalized drug discovery",
        "Biological pathway simulation"
      ],
      specs: {
        "Genomic Throughput": "10TB/hr",
        "Simulation Fidelity": "99.9%",
        "Biological Nodes": "4.2B+",
        "Discovery Speed": "100x Human"
      },
      useCases: [
        "Rare disease research",
        "Vaccine development",
        "Agricultural genetic engineering",
        "Longevity science"
      ],
      deepDive: "By simulating the entire human proteome in a virtual environment, BioMind AI can test billions of drug interactions in seconds. Its 'Bio-Digital Twin' technology allows researchers to model how a specific genetic therapy will affect a patient's unique biological makeup before a single dose is administered. This is the end of trial-and-error medicine.",
      howItWorks: "BioMind AI leverages transformer-based 'Proteomic Folding' models to simulate the entire human biological landscape. It utilizes molecular dynamics simulations to predict high-affinity drug-protein interactions, enabling the discovery of personalized therapeutic strategies through virtual bio-digital twin modeling."
    }
  },
  {
    name: "GenAI Doctor",
    category: "AI Medical Intelligence",
    description: "Digital hospital powered by advanced intelligence. Analyze symptoms, diagnostic reports, and lab results for health insights.",
    link: "https://genai-doctor.pages.dev/",
    icon: <Stethoscope />,
    color: "#10b981",
    pattern: "moire",
    details: {
      overview: "A comprehensive digital health intelligence platform. GenAI Doctor provides clinical-grade analysis of medical data directly on your device.",
      capabilities: [
        "Diagnostic report analysis",
        "Symptom pattern matching",
        "Lab result interpretation",
        "Preventative health modeling"
      ],
      specs: {
        "Diagnostic Accuracy": "98.7%",
        "Response Time": "< 1s",
        "Privacy Level": "HIPAA+ On-Device",
        "Knowledge Base": "Global Medical Data"
      },
      useCases: [
        "Remote patient monitoring",
        "Emergency triage support",
        "Radiology image analysis",
        "Health trend prediction"
      ],
      deepDive: "GenAI Doctor utilizes a 'Multi-Modal Diagnostic' engine that cross-references visual data (scans/photos), textual data (reports), and sensor data (wearables). It can detect early-stage cardiovascular issues up to 18 months before physical symptoms appear. It acts as a 24/7 medical guardian, providing peace of mind through constant, non-invasive monitoring.",
      howItWorks: "GenAI Doctor utilizes a 'Multi-Modal Diagnostic Fusion' engine that cross-references clinical-grade telemetry with a global medical knowledge graph. It applies anomaly detection algorithms to radiology and lab data, synthesizing preventative health models that identify cardiovascular and neurological risks 18 months before clinical manifestation."
    }
  },
  {
    name: "Vayu IDE",
    category: "AI Software Creation",
    description: "Advanced development platform capable of designing complete software systems and enterprise SaaS platforms autonomously.",
    link: "https://vayu-ide.pages.dev/",
    icon: <Code2 />,
    color: "#f59e0b",
    pattern: "grid",
    details: {
      overview: "The future of software engineering. Vayu IDE doesn't just help you code; it designs, builds, and deploys entire architectures autonomously.",
      capabilities: [
        "Autonomous system design",
        "Self-healing code generation",
        "Enterprise SaaS architecture",
        "Automated security auditing"
      ],
      specs: {
        "Build Speed": "10k LOC/min",
        "Bug Detection": "99.99%",
        "Deployment": "Multi-Cloud Native",
        "Language Support": "All Major Stacks"
      },
      useCases: [
        "Rapid MVP development",
        "Legacy code modernization",
        "Autonomous QA testing",
        "Cloud infrastructure scaling"
      ],
      deepDive: "Vayu IDE leverages 'Semantic Logic Synthesis' to understand business requirements in natural language and translate them into optimized, scalable codebases. It automatically manages database migrations, API documentation, and CI/CD pipelines. It's like having a team of 100 senior engineers working in perfect unison, instantly.",
      howItWorks: "Vayu IDE operates through a 'Recursive Semantic Synthesis' protocol, where high-level conceptual intent is mirrored across a multi-dimensional neural lattice. This hypnotic decomposition process utilizes autonomous sub-agents to synthesize self-correcting codebases, ensuring that every line of logic is mathematically optimized and architecturally mirrored for perfect system equilibrium."
    }
  },
  {
    name: "Vayu Creative Studio",
    category: "AI Media Generation",
    description: "Generate high-quality images, videos, and visual content powered by the creative intelligence of Vayu AGI.",
    link: "https://vayu-creativestudio.pages.dev/",
    icon: <Palette />,
    color: "#ec4899",
    pattern: "spiral",
    details: {
      overview: "Unleash the creative potential of AGI. Vayu Creative Studio generates cinematic visuals and immersive media with unprecedented artistic depth.",
      capabilities: [
        "Cinematic video generation",
        "High-fidelity image synthesis",
        "3D environment creation",
        "Artistic style transfer"
      ],
      specs: {
        "Resolution": "Up to 16K",
        "Frame Rate": "120 FPS Native",
        "Creative Depth": "Ultra-HDR",
        "Processing": "Neural GPU Optimized"
      },
      useCases: [
        "Film & TV production",
        "Game asset creation",
        "Marketing visual design",
        "Architectural visualization"
      ],
      deepDive: "The 'Artistic Intuition' engine in Creative Studio doesn't just copy styles; it understands composition, lighting, and emotional resonance. It can generate a 60-second cinematic sequence from a single paragraph of text, complete with spatial audio and physics-based lighting. It is the ultimate tool for storytellers who want to see their dreams realized in high definition.",
      howItWorks: "Creative Studio utilizes a 'Latent Artistic Intuition' engine that maps high-level semantic intent to high-dimensional visual latent spaces. It employs physics-based lighting models and spatial audio synthesis to generate cinematic 16K sequences, ensuring every frame is compositionally and emotionally resonant."
    }
  },
  {
    name: "Spark AI",
    category: "AI Search Engine",
    description: "Next-generation search engine that blocks ads, removes trackers, and protects privacy while processing real-time data.",
    link: "https://spark-ai-search.pages.dev/",
    icon: <Search />,
    color: "#06b6d4",
    pattern: "waves",
    details: {
      overview: "The internet, cleaned and organized by intelligence. Spark AI provides real-time answers without the noise of ads or tracking.",
      capabilities: [
        "Ad-free search experience",
        "Real-time data indexing",
        "Privacy-first tracking block",
        "Intelligent answer synthesis"
      ],
      specs: {
        "Search Speed": "< 100ms",
        "Privacy Score": "100/100",
        "Ad Block Rate": "100%",
        "Index Size": "Exascale"
      },
      useCases: [
        "Secure web research",
        "Real-time news synthesis",
        "Academic data discovery",
        "Private browsing"
      ],
      deepDive: "Spark AI uses 'Contextual Intent Mapping' to understand exactly what you're looking for, even with vague queries. It bypasses the SEO-optimized 'junk' of the modern web to find the most authoritative and relevant information. Your search history is never stored, and your identity is masked through a decentralized relay network.",
      howItWorks: "Spark AI employs a 'Contextual Intent Mapping' protocol that bypasses SEO-optimized noise to index the web's authoritative core. It utilizes a decentralized relay network to mask user identity while synthesizing real-time, fact-checked answers through a multi-layered transformer architecture."
    }
  },
  {
    name: "Vayu IDS",
    category: "AI Cybersecurity System",
    description: "Intelligent cybersecurity platform detecting malicious activity and network anomalies before they spread.",
    link: "https://vayu-ids.pages.dev/",
    icon: <ShieldAlert />,
    color: "#ef4444",
    pattern: "grid",
    details: {
      overview: "A proactive shield for the digital age. Vayu IDS uses behavioral intelligence to stop threats before they manifest.",
      capabilities: [
        "Anomaly detection AI",
        "Zero-day threat blocking",
        "Network traffic analysis",
        "Automated incident response"
      ],
      specs: {
        "Detection Rate": "99.999%",
        "Response Time": "Microseconds",
        "Threat Intel": "Global Real-time",
        "Analysis Mode": "Deep Packet Neural"
      },
      useCases: [
        "Enterprise network defense",
        "Critical infrastructure protection",
        "Financial fraud prevention",
        "Data breach mitigation"
      ],
      deepDive: "Vayu IDS operates on a 'Zero-Trust Neural Mesh' that monitors every packet and behavioral pattern across your network. It can identify a zero-day exploit by detecting subtle deviations in system call patterns that no signature-based firewall would ever catch. It doesn't just alert you; it autonomously isolates infected nodes and heals the vulnerability in real-time.",
      howItWorks: "Vayu IDS operates on a 'Zero-Trust Neural Mesh' that monitors network behavioral entropy. It utilizes unsupervised learning to establish a baseline of system-call patterns, autonomously isolating infected nodes and neutralizing zero-day threats through real-time architectural self-healing."
    }
  },
  {
    name: "Threat Map",
    category: "Global Cyber Intelligence",
    description: "Real-time global visualization system showing live cyber threats and malicious network activity around the world.",
    link: "https://threat-map.pages.dev/",
    icon: <Globe />,
    color: "#6366f1",
    pattern: "circles",
    details: {
      overview: "Visualize the global digital battlefield. Threat Map provides a real-time window into the world's cyber activity.",
      capabilities: [
        "Live threat visualization",
        "Global attack pattern tracking",
        "Regional risk assessment",
        "Historical trend analysis"
      ],
      specs: {
        "Visual Latency": "< 50ms",
        "Data Points": "1B+ per hour",
        "Map Resolution": "Street Level",
        "Intelligence": "Multi-Source Feed"
      },
      useCases: [
        "National security monitoring",
        "Global threat intelligence",
        "Cyber warfare analysis",
        "Public safety awareness"
      ],
      deepDive: "The Threat Map is a high-fidelity 'Digital Twin' of the global internet. It aggregates data from millions of sensors, honeypots, and Vayu IDS nodes to provide a comprehensive view of the world's security posture. It is used by governments and enterprises to anticipate large-scale cyber campaigns before they reach their targets.",
      howItWorks: "Threat Map aggregates exascale telemetry from a global sensor network into a high-fidelity 'Digital Twin' of the internet. It applies predictive threat modeling to visualize attack vectors in real-time, forecasting large-scale cyber campaigns through multi-source intelligence triangulation."
    }
  }

];


export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isEnginesOpen, setIsEnginesOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen cursor-none bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Hypnotic Loading Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'repeating-conic-gradient(from 0deg, #7c3aed 0deg 10deg, transparent 10deg 20deg)',
                animation: 'spin 20s linear infinite'
              }} />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-24 h-24 mb-8 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-leo-purple rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-white/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_15px_#fff]" />
                </div>
              </div>
              <h2 className="text-2xl font-display font-black tracking-[0.5em] text-white uppercase mb-2">VAYU AGI</h2>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    className="w-1 h-1 bg-leo-purple rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scintillating Grid Illusion Overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, #fff 2px, transparent 2px),
              linear-gradient(to right, #ffffff20 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff20 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: 'center center'
          }}
        />
      </div>
      <NeuralCursor />
      <SystemStatus />
      <Background />
      <HypnoticPatternOverlay />
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} products={products} />
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.05] transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1] group/nav">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div 
          onClick={() => setSelectedProduct(null)}
          className="relative z-10"
        >
          <InteractiveLogo />
        </div>
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 relative z-10">
          <div className="relative group/engines">
            <button 
              onMouseEnter={() => setIsEnginesOpen(true)}
              className="flex items-center gap-2 hover:text-white transition-colors relative group py-2"
            >
              AI Engines
              <ChevronDown size={14} className={`transition-transform duration-300 ${isEnginesOpen ? 'rotate-180' : ''}`} />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-leo-purple to-leo-indigo group-hover:w-full transition-all duration-300 ease-out" />
            </button>
            
            <AnimatePresence>
              {isEnginesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  onMouseLeave={() => setIsEnginesOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-leo-dark/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="grid gap-2">
                    {products.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsEnginesOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:scale-110 transition-transform" style={{ color: p.color }}>
                          {React.cloneElement(p.icon as React.ReactElement<any>, { size: 16 })}
                        </div>
                        <span className="text-[10px] tracking-widest group-hover/item:text-white transition-colors">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#about" className="hover:text-white transition-colors relative group py-2">
            Vayu AGI
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-leo-purple to-leo-indigo group-hover:w-full transition-all duration-300 ease-out" />
          </a>
          <a href="#philosophy" className="hover:text-white transition-colors relative group py-2">
            Philosophy
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-leo-purple to-leo-indigo group-hover:w-full transition-all duration-300 ease-out" />
          </a>
          <a href="#ecosystem" className="hover:text-white transition-colors relative group py-2">
            Ecosystem
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-leo-purple to-leo-indigo group-hover:w-full transition-all duration-300 ease-out" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors relative group py-2">
            Contact
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-leo-purple to-leo-indigo group-hover:w-full transition-all duration-300 ease-out" />
          </a>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            Menu
          </button>
          <button className="hidden sm:block px-6 md:px-8 py-3 md:py-3.5 rounded-2xl bg-white text-leo-dark font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-gradient-to-r hover:from-leo-purple hover:to-leo-indigo hover:text-white transition-all duration-500 shadow-xl shadow-white/5 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <MirrorSection>
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 sm:px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, scale, y: yParallax }}
          className="text-center z-10 max-w-6xl w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-leo-purple/10 border border-leo-purple/20 text-leo-purple text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] mb-8 sm:mb-12 backdrop-blur-md hover:bg-leo-purple/20 hover:border-leo-purple/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 cursor-pointer group"
            >
              <Zap size={14} className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-125 transition-transform duration-300" />
              The Next Frontier of AGI
            </motion.div>
            <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-display font-black tracking-tighter leading-[0.8] mb-8 sm:mb-12 relative">
              <span className="block opacity-20"><ScrambleText text="UNLEASH YOUR" /></span>
              <span className="leo-gradient glow-text relative inline-block py-4">
                <ScrambleText text="INTELLIGENCE" />
                <motion.div 
                  className="absolute inset-0 bg-white mix-blend-overlay"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scaleX: [0, 1, 0] }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/30 max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed font-light px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Experience the world's most powerful decentralized AGI ecosystem. 
                Built for creators, researchers, and pioneers of the digital age.
              </motion.span>
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full px-4"
            >
              <button className="w-full sm:w-auto px-8 sm:px-14 py-5 sm:py-7 rounded-2xl bg-white text-leo-dark font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-[11px] hover:bg-leo-purple hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(124,58,237,0.4)] hover:scale-105 group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Start Creating
                  <ChevronDown className="inline-block ml-2 sm:ml-3 group-hover:translate-y-1 transition-transform" size={16} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-leo-purple to-leo-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button className="w-full sm:w-auto px-8 sm:px-14 py-5 sm:py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-[11px] hover:bg-white/10 hover:border-leo-purple/50 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] hover:scale-105 transition-all duration-500 backdrop-blur-sm group relative overflow-hidden">
                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-leo-purple transition-all duration-300">View Ecosystem</span>
                <div className="absolute inset-0 bg-gradient-to-r from-leo-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl opacity-40 pointer-events-none hidden md:block">
          <NeuralCore />
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/10"
        >
          <ChevronDown size={32} className="sm:w-10 sm:h-10" />
        </motion.div>
      </section>
      </MirrorSection>

      {/* What is Vayu AGI */}
      <MirrorSection>
        <section id="about" className="py-24 md:py-40 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 md:mb-10 leo-gradient">What is Vayu AGI?</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/50 leading-relaxed mb-10 md:mb-16 font-light">
                Vayu AGI is an edge-based Artificial General Intelligence framework that transforms mobile devices into autonomous intelligence engines capable of advanced reasoning and scientific discovery.
              </p>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
              >
                {[
                  { icon: <Lock size={20} className="sm:w-6 sm:h-6" />, title: "Privacy", desc: "Intelligence lives on the device" },
                  { icon: <Zap size={20} className="sm:w-6 sm:h-6" />, title: "Autonomy", desc: "No centralized cloud dependency" },
                  { icon: <Activity size={20} className="sm:w-6 sm:h-6" />, title: "Real-time", desc: "Sub-second neural reasoning" },
                  { icon: <Globe size={20} className="sm:w-6 sm:h-6" />, title: "Offline", desc: "Fully functional without internet" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="leo-card p-6 sm:p-8 group relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:-translate-y-1 hover:border-leo-purple/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-leo-purple/10 via-leo-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)]" />
                    <div className="relative z-10">
                      <div className="text-leo-purple mb-4 sm:mb-5 group-hover:scale-125 group-hover:text-white transition-all duration-500 origin-left group-hover:drop-shadow-[0_0_15px_rgba(124,58,237,0.8)]">{item.icon}</div>
                      <h4 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-leo-purple transition-all duration-300">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-white/30 leading-relaxed group-hover:text-white/60 transition-colors duration-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="relative aspect-square flex items-center justify-center mt-12 lg:mt-0 max-w-[400px] lg:max-w-none mx-auto w-full group">
              <div className="absolute inset-0 bg-leo-purple/10 blur-[60px] sm:blur-[100px] rounded-full group-hover:bg-leo-purple/20 transition-colors duration-500" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full relative"
              >
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `rotate(${deg}deg) translateX(min(40vw, 180px))` }}
                  >
                    <div className="glass-panel p-3 sm:p-4 rotate-[inherit] border-white/20 group-hover:border-leo-purple/50 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-500">
                      <Cpu className="text-leo-indigo w-5 h-5 sm:w-6 sm:h-6 group-hover:text-leo-purple transition-colors duration-500" />
                    </div>
                  </div>
                ))}
              </motion.div>
              <div className="absolute w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-leo-purple to-leo-indigo p-[2px] animate-pulse group-hover:scale-110 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-space-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-leo-purple/20 to-leo-indigo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-leo-purple/20 blur-xl absolute group-hover:bg-leo-purple/40 transition-colors duration-500" />
                  <Activity size={24} className="text-white sm:w-10 sm:h-10 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </MirrorSection>

      {/* Edge Intelligence Demo */}
      <EdgeIntelligenceDemo />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-40 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 md:mb-8 tracking-tighter">THE RUDRA PHILOSOPHY</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
              We believe intelligence should be a human right, not a corporate asset. 
              Our architecture is built on three unbreakable pillars.
            </p>
          </motion.div>            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { 
                title: "User-Owned", 
                desc: "Your data never leaves your device. Privacy is not a feature, it's the foundation.",
                color: "from-leo-purple/20 to-transparent",
                border: "group-hover:border-leo-purple/50",
                shadow: "hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]",
                textHover: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-leo-purple"
              },
              { 
                title: "Autonomous", 
                desc: "AI that discovers, learns, and creates independently for human benefit.",
                color: "from-leo-indigo/20 to-transparent",
                border: "group-hover:border-leo-indigo/50",
                shadow: "hover:shadow-[0_0_40px_rgba(79,70,229,0.2)]",
                textHover: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-leo-indigo"
              },
              { 
                title: "Decentralized", 
                desc: "No single point of failure. No central authority. Just pure intelligence.",
                color: "from-leo-gold/20 to-transparent",
                border: "group-hover:border-leo-gold/50",
                shadow: "hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]",
                textHover: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-leo-gold"
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`leo-card p-8 md:p-10 bg-gradient-to-b ${pillar.color} group relative overflow-hidden ${pillar.border} ${pillar.shadow} hover:-translate-y-2 transition-all duration-500 backdrop-blur-xl border border-white/5`}
              >
                <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative z-10">
                  <h3 className={`text-2xl md:text-3xl font-display font-black mb-4 md:mb-6 tracking-tight group-hover:translate-x-2 transition-all duration-500 ${pillar.textHover}`}>{pillar.title}</h3>
                  <p className="text-base md:text-lg text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 md:mb-8 tracking-tighter relative inline-block">
              VAYU ECOSYSTEM
              <motion.div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-leo-purple to-leo-indigo"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h2>
            <p className="text-lg md:text-2xl text-white/30 max-w-3xl mx-auto font-light leading-relaxed mt-8">
              A decentralized network of specialized intelligence engines, all powered by the Vayu AGI core.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Sections */}
      {products.map((product, index) => (
        <ProductSection 
          key={index} 
          product={product} 
          index={index} 
          onSelect={() => setSelectedProduct(product)}
        />
      ))}

      {/* Final Section */}
      <section className="py-32 md:py-48 px-4 sm:px-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-leo-purple/10 group-hover:to-leo-purple/20 transition-colors duration-1000" />
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, transparent 70%)'
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-black mb-8 md:mb-10 tracking-tighter leading-tight relative inline-block">
              THE FUTURE IS <br /> 
              <span className="leo-gradient relative inline-block">
                AUTONOMOUS
                <motion.div 
                  className="absolute -inset-4 bg-leo-purple/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                />
              </span>
            </h2>
            <p className="text-lg md:text-2xl text-white/40 mb-12 md:mb-16 leading-relaxed font-light max-w-3xl mx-auto group-hover:text-white/60 transition-colors duration-500">
              Rudra represents a new era where intelligence is not centralized, not controlled, and not surveilled. 
              The age of autonomous intelligence has begun.
            </p>
            <motion.div 
              className="w-24 md:w-32 h-1 bg-gradient-to-r from-leo-purple via-leo-indigo to-leo-gold mx-auto mb-12 md:mb-16"
              whileInView={{ width: ["0%", "100%", "24%"] }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-black tracking-[0.2em] md:tracking-[0.4em] uppercase leo-gradient group-hover:tracking-[0.5em] transition-all duration-700">
              Human-Centric. Private. Autonomous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 px-4 sm:px-6 relative border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-8 leo-gradient">Connect with Rudra</h2>
              <p className="text-lg md:text-2xl text-white/40 font-light leading-relaxed mb-12">
                Have questions about our ecosystem or want to explore partnership opportunities? Our team of autonomous intelligence experts is ready to assist.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-leo-purple group-hover:scale-110 group-hover:bg-leo-purple group-hover:text-white transition-all duration-500">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Mobile Support</div>
                    <div className="text-xl font-bold text-white">+91 9618868370</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-leo-indigo group-hover:scale-110 group-hover:bg-leo-indigo group-hover:text-white transition-all duration-500">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">General Inquiries</div>
                    <div className="text-xl font-bold text-white">info.rudra@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Incident Reporting</div>
                    <div className="text-xl font-bold text-white">incident.rudra@gmail.com</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="leo-card p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-leo-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-leo-purple focus:outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-leo-purple focus:outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Subject</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-leo-purple focus:outline-none transition-all" placeholder="Partnership Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-leo-purple focus:outline-none transition-all resize-none" placeholder="Tell us more about your project..." />
                </div>
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-leo-purple to-leo-indigo text-white font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-leo-purple/20">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-24 px-4 sm:px-8 border-t border-white/5 bg-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-leo-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3 md:gap-4 cursor-pointer group/logo">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xl text-white border border-white/10 group-hover/logo:border-leo-purple/50 group-hover/logo:shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover/logo:scale-110 transition-all duration-500">R</div>
                <span className="font-display font-black tracking-tighter text-2xl text-white/80">RUDRA AI</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed font-light">
                The world's first decentralized edge-based AGI ecosystem. Redefining the boundaries of autonomous intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-6">Social Ecosystem</h4>
              <div className="flex flex-col gap-4">
                <a href="https://github.com/Dort-boll" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group/link">
                  GitHub <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                </a>
                <a href="https://www.youtube.com/@Rudratechinc" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group/link">
                  YouTube <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                </a>
                <a href="https://www.instagram.com/rudratechinc/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group/link">
                  Instagram <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                </a>
                <a href="https://in.linkedin.com/in/rudra-tech-inc-159b662b2?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group/link">
                  LinkedIn <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-6">Quick Links</h4>
              <div className="flex flex-col gap-4">
                <a href="#about" className="text-sm text-white/30 hover:text-white transition-colors">Vayu AGI</a>
                <a href="#philosophy" className="text-sm text-white/30 hover:text-white transition-colors">Philosophy</a>
                <a href="#ecosystem" className="text-sm text-white/30 hover:text-white transition-colors">Ecosystem</a>
                <a href="#contact" className="text-sm text-white/30 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-6">Legal</h4>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-white/30 hover:text-white transition-colors">Ethics Charter</a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">© 2026 Rudra AI Ecosystem. All Rights Reserved.</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Global Node Status: Optimal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
