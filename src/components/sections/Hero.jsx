import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-transparent py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Futuristic Grid Overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Bottom Vignette/Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020512] to-transparent z-[1] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Luxury Editorial Typography & Copywriting */}
        <div className="flex-1 text-left max-w-2xl pointer-events-auto">

          {/* Luxury High-Contrast Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70"
          >
            INVISÍVEL ATÉ
            <br />
            SER <span className="text-primary select-none drop-shadow-[0_0_30px_rgba(30,91,255,0.4)]">NECESSÁRIO.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed font-semibold tracking-wide"
          >
            Proteção automotiva sob medida com cobertura nacional imediata. Sem burocracia, sem termos ocultos. Apenas a certeza de ir e vir com a tranquilidade que você merece.
          </motion.p>

          {/* Premium Industrial Call to Action Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-transparent hover:text-white border border-white px-9 py-4.5 text-[10px] font-black tracking-[0.25em] transition-all duration-300 active:scale-95 shadow-[0_4px_25px_rgba(255,255,255,0.1)]"
            >
              FAZER COTAÇÃO
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-3 border border-white/10 hover:border-white/30 bg-transparent text-white text-[10px] font-black tracking-[0.25em] px-9 py-4.5 transition-all duration-300 active:scale-95 hover:bg-white/[0.02]"
            >
              CONHECER PLANOS
            </button>
          </motion.div>
        </div>

        {/* Right Side: Free Floating 3D Holographic Projector (Card container removed) */}
        <div className="w-full lg:w-auto flex-1 flex justify-center lg:justify-end pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-md aspect-square pointer-events-auto flex flex-col items-center justify-center relative overflow-visible group"
          >
            {/* Orbit 1: Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-[440px] h-[440px] rounded-full border border-primary/20 flex items-center justify-center -z-10"
            >
              <div className="w-[6px] h-[6px] bg-primary rounded-full absolute -top-[3px] shadow-[0_0_10px_#1E5BFF]" />
            </motion.div>

            {/* Orbit 2: Inner Rotating Dashed Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-cyan-500/15 flex items-center justify-center -z-10"
            >
              <div className="w-[4px] h-[4px] bg-cyan-400 rounded-full absolute -bottom-[2px] shadow-[0_0_8px_#06B6D4]" />
            </motion.div>

            {/* Orbit 3: Center Grid Rings */}
            <div className="absolute w-60 h-60 border border-primary/5 rounded-full -z-10 flex items-center justify-center">
              <div className="w-44 h-44 border border-dashed border-primary/5 rounded-full" />
            </div>

            {/* Holographic light projector base pedestal at the bottom */}
            <div className="w-80 h-6 bg-gradient-to-t from-primary/35 via-primary/5 to-transparent border-b-2 border-primary/45 rounded-full absolute bottom-8 blur-[0.5px] shadow-[0_15px_40px_rgba(30,91,255,0.45)]" />

            {/* Holographic scan beam cone */}
            <div 
              className="absolute bottom-10 w-64 h-72 bg-gradient-to-t from-primary/12 via-primary/[0.01] to-transparent opacity-75 pointer-events-none" 
              style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
            />

            {/* Bobbing Levitating Giant Brand Logo */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center text-center select-none cursor-pointer"
            >
              <img 
                src="/images/content3.png" 
                alt="AutoProtect Logo" 
                className="w-56 h-56 object-contain drop-shadow-[0_0_60px_rgba(30,91,255,0.8)] group-hover:scale-105 transition-transform duration-500 filter brightness-110" 
              />
              <div className="mt-5 font-black text-3xl tracking-tighter leading-none">
                <span className="text-white font-black">Auto</span>
                <span className="text-primary drop-shadow-[0_0_12px_rgba(30,91,255,0.6)]">Protec</span>
              </div>
              <div className="text-[9px] tracking-[0.45em] text-gray-500 font-extrabold mt-3 uppercase">
                COBERTURA AUTOMOTIVA ELITE
              </div>
            </motion.div>


          </motion.div>
        </div>

      </div>
    </section>
  );
}
