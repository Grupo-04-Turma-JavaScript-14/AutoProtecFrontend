import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight, Shield, Radio, Activity, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../common/Logo.jsx";

export const links = [
  { label: "HOME", to: "/" },
  { label: "SOBRE NÓS", to: "/sobre" },
  { label: "SEGUROS", to: "/seguros" },
  { label: "CONTATO", to: "/contato" },
];

// Web Audio API Context and nodes (global state)
let audioCtx = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let filterNode = null;
let masterGain = null;

// Synthesize high-frequency hover laser SFX (0.05s)
export const playHoverSound = () => {
  if (!audioCtx || audioCtx.state === "suspended") return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, audioCtx.currentTime); // crisp sweep

    gain.gain.setValueAtTime(0.008, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.warn("Hover sound synth block:", e);
  }
};

// Synthesize double beep positive success SFX
export const playSuccessSound = () => {
  if (!audioCtx || audioCtx.state === "suspended") return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(650, audioCtx.currentTime);
    osc.frequency.setValueAtTime(950, audioCtx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.warn("Success sound synth block:", e);
  }
};

// Helper Component: Interactive text scramble decryption effect on hover with audio
function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "10100101#@$%&*";

  const handleScramble = () => {
    // Play laser hover SFX
    playHoverSound();

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 25);
  };

  return (
    <span onMouseEnter={handleScramble} className="font-mono tracking-[0.2em] font-extrabold text-[10px]">
      {displayText}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  // Audio state
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Real-time dynamic states (Improvements 2, 5)
  const [ping, setPing] = useState(0.04);
  const [utcTime, setUtcTime] = useState("00:00:00 UTC");

  // Monitor scroll to transform navbar state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fluctuating network latency simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(0.02 + Math.random() * 0.03);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Live military clock simulator
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, "0");
      const m = String(now.getUTCMinutes()).padStart(2, "0");
      const s = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${h}:${m}:${s} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to custom window events for triggering SFX from other modules (like CTA)
  useEffect(() => {
    const handleSuccessAudio = () => {
      playSuccessSound();
    };
    const handleAutoToggle = () => {
      // Dispatch toggle Audio directly inside context
      toggleAudio();
    };
    window.addEventListener("play-success-sound", handleSuccessAudio);
    window.addEventListener("activate-audio-from-preloader", handleAutoToggle);
    return () => {
      window.removeEventListener("play-success-sound", handleSuccessAudio);
      window.removeEventListener("activate-audio-from-preloader", handleAutoToggle);
    };
  }, [audioEnabled]);

  // Generative Synthesizer Engine (Web Audio API)
  const toggleAudio = () => {
    if (!audioEnabled) {
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }

        // 1. Create master volume node (extremely low to remain cozy and premium)
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.012, audioCtx.currentTime);

        // 2. Low-pass filter for cozy warm synthetic atmosphere
        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = "lowpass";
        filterNode.frequency.setValueAtTime(160, audioCtx.currentTime);

        // 3. Synth Oscillator 1: Sine wave at 110Hz (A2 key note)
        ambientOsc1 = audioCtx.createOscillator();
        ambientOsc1.type = "sine";
        ambientOsc1.frequency.setValueAtTime(110, audioCtx.currentTime);

        // 4. Synth Oscillator 2: Triangle wave at 165Hz (E3 key fifth note)
        ambientOsc2 = audioCtx.createOscillator();
        ambientOsc2.type = "triangle";
        ambientOsc2.frequency.setValueAtTime(165, audioCtx.currentTime);

        // Connect synthesis structure
        ambientOsc1.connect(filterNode);
        ambientOsc2.connect(filterNode);
        filterNode.connect(masterGain);
        masterGain.connect(audioCtx.destination);

        ambientOsc1.start();
        ambientOsc2.start();

        setAudioEnabled(true);
        playSuccessSound();
      } catch (e) {
        console.error("Synthesizer failed to initialize:", e);
      }
    } else {
      try {
        if (ambientOsc1) {
          ambientOsc1.stop();
          ambientOsc1.disconnect();
        }
        if (ambientOsc2) {
          ambientOsc2.stop();
          ambientOsc2.disconnect();
        }
        if (audioCtx) {
          audioCtx.suspend();
        }
        setAudioEnabled(false);
      } catch (e) {
        console.error("Synthesizer failed to stop:", e);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto w-full rounded-xl border transition-all duration-500 px-6 sm:px-8 relative overflow-hidden ${
            scrolled
              ? "bg-black/60 border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl"
              : "bg-transparent border-transparent"
          }`}
          aria-label="Navegação principal"
        >
          {/* Laser Bottom Border (Improvement 1) */}
          <div className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#1E5BFF] to-transparent transition-all duration-700 origin-center ${
            scrolled ? "w-full opacity-100" : "w-0 opacity-0"
          }`} />

          <div className="flex items-center justify-between h-16 relative z-10">
            
            {/* Logo & Network Status Widget */}
            <div className="flex items-center gap-4 relative z-50">
              <Link to="/" aria-label="AutoProtect Seguros - Home">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation Links with sliding background pill */}
            <div className="hidden lg:flex items-center gap-2 relative">
              {links.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 transition-colors duration-300 rounded-md block ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active / Hover sliding background backplate */}
                      <AnimatePresence>
                        {hoveredIdx === idx && (
                          <motion.div
                            layoutId="navHoverPill"
                            className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-md -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          layoutId="navActiveDot"
                          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}

                      <ScrambleText text={link.label} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Generative Audio, Live clock & Customer Button */}
            <div className="hidden lg:flex items-center gap-6">
              
              {/* IMMERSIVE SYNTHESISER CONTROL PANEL WIDGET */}
              <button
                type="button"
                onClick={toggleAudio}
                className={`flex items-center gap-3 px-3 py-2 border rounded-md font-mono text-[8px] transition-all duration-300 hover:bg-white/5 active:scale-95 ${
                  audioEnabled 
                    ? "border-primary/45 bg-primary/[0.04] text-white shadow-[0_0_15px_rgba(30,91,255,0.25)]" 
                    : "border-white/10 text-gray-500"
                }`}
              >
                {audioEnabled ? <Volume2 className="h-3.5 w-3.5 text-primary animate-pulse" /> : <VolumeX className="h-3.5 w-3.5" />}
                <span className="tracking-widest">AP-AUDIO: {audioEnabled ? "ON" : "MUTED"}</span>

                {/* Animated graphic equalizer bars */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <div 
                    className={`w-[1px] bg-primary rounded-full transition-all duration-300 ${audioEnabled ? "animate-[bounce_0.6s_ease-in-out_infinite]" : "h-1"}`} 
                    style={{ animationDelay: "0.1s" }} 
                  />
                  <div 
                    className={`w-[1px] bg-primary rounded-full transition-all duration-300 ${audioEnabled ? "animate-[bounce_1s_ease-in-out_infinite]" : "h-1.5"}`} 
                    style={{ animationDelay: "0.3s" }} 
                  />
                  <div 
                    className={`w-[1px] bg-primary rounded-full transition-all duration-300 ${audioEnabled ? "animate-[bounce_0.8s_ease-in-out_infinite]" : "h-2"}`} 
                    style={{ animationDelay: "0.5s" }} 
                  />
                </div>
              </button>

              {/* UTC military live clock */}
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 select-none">
                <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
                <span className="tracking-widest">{utcTime}</span>
              </div>

              {/* Client Tactical Button with sweep scanner */}
              <button
                type="button"
                onMouseEnter={playHoverSound}
                className="group relative overflow-hidden bg-white text-black hover:bg-transparent hover:text-white border border-white px-5 py-3 text-[9px] font-black tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-9 transition-all duration-1000 ease-linear" />
                ÁREA DO CLIENTE
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2 relative z-50 hover:bg-white/5 rounded-lg transition-colors"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Cyber CRT Terminal Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020512] lg:hidden flex flex-col justify-center items-center px-6 overflow-hidden crt-flicker-anim"
          >
            {/* CRT TV monitor effects overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30 crt-overlay" />
            <div className="absolute inset-0 pointer-events-none z-10 crt-noise" />

            <div className="flex flex-col items-center gap-10 w-full max-w-sm relative z-20">
              
              {/* Header inside the terminal */}
              <div className="text-center font-mono space-y-1 mb-4 select-none">
                <Shield className="h-8 w-8 text-primary mx-auto animate-pulse" />
                <span className="text-[10px] text-primary tracking-[0.2em] uppercase block">AUTOPROTECT TERMINAL v1.0</span>
                <span className="text-[8px] text-gray-500 tracking-wider">LATENCY: {ping.toFixed(2)}ms // {utcTime}</span>
              </div>

              {/* Menu terminal links */}
              <div className="w-full flex flex-col gap-4">
                {links.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="w-full text-center"
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block text-sm font-mono tracking-[0.25em] py-3.5 border border-white/[0.04] bg-white/[0.01] hover:bg-primary/[0.05] hover:border-primary/20 transition-all duration-300 uppercase ${isActive
                          ? "text-primary border-primary/20 bg-primary/[0.04]"
                          : "text-gray-400 hover:text-white"
                        }`
                      }
                    >
                      &gt; {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA terminal action button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.08, duration: 0.4 }}
                className="w-full mt-4"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-between border border-white bg-white text-black hover:bg-transparent hover:text-white text-[10px] font-black tracking-[0.25em] py-4 px-6 transition-all duration-300 uppercase"
                >
                  SOLICITAR COTAÇÃO
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
