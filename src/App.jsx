import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu } from "lucide-react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import GlobalBackground3D from "./components/three/GlobalBackground3D.jsx";

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
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("");
  const [scrambledLog, setScrambledLog] = useState(""); // Improvement 8

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

  // Synthesize dramatic start-up synth bass drop riser and transition to ambient synth
  const handleSystemActivation = () => {
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

    // Auto-toggle active ambient audio in Navbar
    window.dispatchEvent(new CustomEvent("activate-audio-from-preloader"));
    
    // Complete fake loading and trigger entrance
    setLoading(false);
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
              scale: 1.06,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-[100] bg-[#141519] flex flex-col items-center justify-center font-mono p-6 overflow-hidden"
          >
            {/* Inner CRT texture */}
            <div className="absolute inset-0 pointer-events-none opacity-45 crt-overlay" />
            <div className="absolute inset-0 pointer-events-none crt-noise" />

            <div className="flex flex-col items-center gap-10 max-w-sm w-full relative z-10 text-center">
              
              {/* Dynamic Scanning Circular HUD */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Outer Orbit Track */}
                  <circle
                    cx="88"
                    cy="88"
                    r="80"
                    className="stroke-white/[0.04] fill-none"
                    strokeWidth="2"
                  />
                  {/* Animated glowing progress ring */}
                  <motion.circle
                    cx="88"
                    cy="88"
                    r="80"
                    className="stroke-primary fill-none shadow-[0_0_15px_#1E5BFF]"
                    strokeWidth="3"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
                    transition={{ ease: "easeOut" }}
                  />
                </svg>
                
                {/* Numeric Center tracker with live EQ (Improvement 7) */}
                <div className="absolute flex flex-col items-center justify-center">
                  <Shield className="h-8 w-8 text-primary animate-pulse mb-1" />
                  <span className="text-2.5xl font-black tracking-widest text-white leading-none">
                    {String(progress).padStart(3, "0")}%
                  </span>
                  
                  {/* Pulsing Audio Waveform HUD Equalizer (Improvement 7) */}
                  <div className="flex gap-0.5 justify-center items-end h-3 mt-1.5 select-none w-16">
                    {[0.5, 0.9, 0.4, 0.8, 0.6].map((initialScale, i) => (
                      <motion.div
                        key={i}
                        animate={{ scaleY: [1, 2.6 * initialScale, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + i * 0.15,
                          ease: "easeInOut",
                        }}
                        className="w-[2px] h-2 bg-primary origin-bottom"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sequential terminal logging readout */}
              <div className="w-full min-h-[54px] bg-black/50 border border-white/[0.06] p-4 rounded text-left font-mono space-y-1.5 shadow-inner">
                <div className="flex justify-between items-center text-[7px] text-gray-500 border-b border-white/[0.06] pb-1 select-none">
                  <span>SEC_MAIN // DECRYPTER_LOGS</span>
                  <span className="animate-pulse text-[#06B6D4]">● RUNNING</span>
                </div>
                <p className="text-[9px] text-[#06B6D4] tracking-wider leading-relaxed truncate">
                  &gt; {scrambledLog}
                </p>
              </div>

              {/* Pulsing Tactical entrance button reveals at 100% */}
              <div className="h-14 w-full flex items-center justify-center">
                <AnimatePresence>
                  {progress === 100 && (
                    <motion.button
                      key="enter-btn"
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -10 }}
                      onClick={handleSystemActivation}
                      className="w-full px-6 py-4.5 bg-white text-black border border-white hover:bg-transparent hover:text-white text-[10px] font-black tracking-[0.3em] transition-all duration-300 shadow-[0_5px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(30,91,255,0.45)] hover:border-primary active:scale-98 uppercase inline-flex items-center justify-center gap-2"
                    >
                      <Cpu className="h-3.5 w-3.5" />
                      ATIVAR ESCUDO AP
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main interactive page layout (Improvement 9 - Zoom Reveal) */}
      <div className="relative z-10 flex flex-col min-h-screen w-full pointer-events-none">
        <div className="pointer-events-auto w-full flex flex-col min-h-screen">
          <AnimatePresence>
            {!loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }} // Improvement 9: Parallax scaling entrance
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
                className="w-full flex flex-col min-h-screen"
              >
                <Navbar />
                <main className="flex-1 w-full">
                  <Outlet />
                </main>
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
