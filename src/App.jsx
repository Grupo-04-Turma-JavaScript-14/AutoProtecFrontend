import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, ArrowRight } from "lucide-react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import GlobalBackground3D from "./components/three/GlobalBackground3D.jsx";
import IntroScrollytelling from "./components/sections/IntroScrollytelling.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

// Tactical boot logs to render sequentially
const BOOT_LOGS = [
  "SYS: INITIALIZING SECURITY CORE v1.9...",
  "SEC: DECRYPTING REGIONAL SHIELD NODES [AES-256]...",
  "NET: ESTABLISHING SECURE CONNECTION...",
  "SYS: MOUNTING 3D DIGITAL SILK WEAVE GRID...",
  "SYS: TACTICAL SYNTHESIZER DRIVER MOUNTED [OK]...",
  "SEC: BLINDAGEM AUTOMOTIVA 100% PRONTA."
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("");
  const [scrambledLog, setScrambledLog] = useState(""); 

  // Counter loop for fake cybernetic preloader
  useEffect(() => {
    if (!loading) return;

    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 2;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
      }
      setProgress(start);

      // Determine matching tactical log based on progress
      const logIdx = Math.min(
        Math.floor((start / 100) * BOOT_LOGS.length),
        BOOT_LOGS.length - 1
      );
      setCurrentLog(BOOT_LOGS[logIdx]);
    }, 60);

    return () => clearInterval(interval);
  }, [loading]);

  // Real-time cryptography text scrambler (Improvement 8)
  useEffect(() => {
    if (!currentLog) return;
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledLog(
        currentLog
          .split("")
          .map((char, index) => {
            if (index < iterations || char === " ") return char;
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"[
              Math.floor(Math.random() * 40)
            ];
          })
          .join("")
      );
      iterations += 2;
      if (iterations >= currentLog.length) {
        clearInterval(interval);
        setScrambledLog(currentLog);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentLog]);

  // Synthesize dramatic start-up synth bass drop riser
  const playRiserSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const startupCtx = new AudioContextClass();
      
      const osc = startupCtx.createOscillator();
      const gain = startupCtx.createGain();
      const filter = startupCtx.createBiquadFilter();

      osc.type = "sawtooth";
      // Dramatic pitch rise sweep from 50Hz up to 220Hz
      osc.frequency.setValueAtTime(50, startupCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, startupCtx.currentTime + 1.2);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, startupCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, startupCtx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.04, startupCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startupCtx.currentTime + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(startupCtx.destination);

      osc.start();
      osc.stop(startupCtx.currentTime + 1.6);
    } catch (e) {
      console.warn("Failed to play dramatic system audio startup riser:", e);
    }
  };

  const handleSystemActivation = () => {
    playRiserSound();
    // Transition from progress loader to Scrollytelling introduction
    setLoading(false);
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    // Lock document scroll to discard trackpad/mousewheel inertial carryover
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    window.scrollTo({ top: 0, left: 0 });
    setShowIntro(false);
    
    // Auto-toggle active ambient audio in Navbar once main landing page reveals
    window.dispatchEvent(new CustomEvent("activate-audio-from-preloader"));

    // Safely restore scrolling after transition has finished and inertia settles
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 850);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative text-white select-none">
      {/* Persistent Fullscreen 3D Scene */}
      <GlobalBackground3D />

      {/* Cyber CRT Monitor Scanlines & Retro Noise Filter Overlays */}
      <div className="fixed inset-0 w-full h-full z-50 pointer-events-none crt-overlay crt-flicker-anim opacity-35" />
      <div className="fixed inset-0 w-full h-full z-50 pointer-events-none crt-noise" />

      {/* Preloader overlay screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.08,
              filter: "blur(8px)",
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Smooth glowing gradients background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none animate-[pulse_3s_infinite]" />

            {/* Main Preloader block */}
            <div className="flex flex-col items-center gap-10 max-w-3xl w-full relative z-10 text-center">
              
              {/* Large central content2 logo */}
              <div className="relative flex items-center justify-center py-4 select-none">
                <img 
                  src="/images/content2.png" 
                  alt="AutoProtect" 
                  className="w-[680px] h-[220px] object-contain filter brightness-110 drop-shadow-[0_0_50px_rgba(30,91,255,0.45)] animate-pulse"
                />
              </div>

              {/* Minimal progress line indicator */}
              <div className="w-80 max-w-full flex flex-col gap-2.5 mt-2 select-none">
                {/* Sleek track */}
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                
                {/* Status & Numeric tracker */}
                <div className="flex justify-between items-center text-[9px] tracking-[0.25em] text-white/40 font-bold uppercase font-sans">
                  <span className="flex items-center gap-1.5 text-blue-500/80">
                    <Shield className="h-3.5 w-3.5 glitch-icon" />
                    {progress === 100 ? "SISTEMA SEGURO" : "CARREGANDO"}
                  </span>
                  <span className="text-white/60">{progress}%</span>
                </div>
              </div>

              {/* Activation button */}
              <div className="h-16 w-full flex items-center justify-center mt-4">
                <AnimatePresence>
                  {progress === 100 && (
                    <motion.button
                      key="enter-btn"
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onClick={handleSystemActivation}
                      className="px-10 py-4.5 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black text-[10px] font-bold tracking-[0.3em] transition-all duration-500 active:scale-[0.98] uppercase inline-flex items-center justify-center gap-3 rounded-full cursor-pointer"
                    >
                      INICIAR APRESENTAÇÃO
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollytelling Presentation overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-scrolly"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[105]"
          >
            <IntroScrollytelling onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main interactive page layout (Reveal after loading and intro) */}
      <div className="relative z-10 flex flex-col min-h-screen w-full pointer-events-none">
        <div className="pointer-events-auto w-full flex flex-col min-h-screen">
          <AnimatePresence>
            {!loading && !showIntro && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="w-full flex flex-col min-h-screen"
              >
                <Navbar />
                <main className="flex-1 w-full">
                  <Outlet />
                </main>
                <Footer />
                <ScrollToTop />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
