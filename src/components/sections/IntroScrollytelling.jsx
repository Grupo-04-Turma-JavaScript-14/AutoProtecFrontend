import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Web Audio API Synthesizer player for premium sound feedback
const playIntroSound = (index) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    
    // Slide 0: Deep Sub-Bass Riser Drone
    if (index === 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.8);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    }
    
    // Slide 1: Techno-Cyber Laser Sweep
    if (index === 1) {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.8);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.0);
    }
    
    // Slide 2: Melodic Success Chime Arpeggio
    if (index === 2) {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        
        gain.gain.setValueAtTime(0.015, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.4);
      });
    }
  } catch (e) {
    console.warn("Failed to play intro synth sound:", e);
  }
};

const slides = [
  {
    id: 0,
    title: "A NOVA ERA DA PROTEÇÃO VEICULAR",
    description: "Desenhamos uma blindagem física e digital invisível. Unimos inteligência computacional ao atendimento humano de alta performance para manter você em constante movimento.",
    image: "/images/hero-car.jpg",
    color: "from-blue-900/30 via-transparent to-transparent",
    dotColor: "bg-primary"
  },
  {
    id: 1,
    title: "MONITORAMENTO ATIVO DE ELITE",
    description: "Sistemas em tempo real conectados a satélites de posicionamento global. Segurança imediata, reboque sob demanda e neutralização inteligente de sinistros em minutos.",
    image: "/images/supercar_dark.png",
    color: "from-cyan-900/20 via-transparent to-transparent",
    dotColor: "bg-cyan-500"
  },
  {
    id: 2,
    title: "SEGURANÇA INVISÍVEL ATÉ SER NECESSÁRIA",
    description: "Sua tranquilidade é nossa prioridade absoluta. A cobertura AutoProtect está ativa e pronta para acompanhar você em todos os seus caminhos.",
    image: "/images/about-person.jpg",
    color: "from-emerald-900/25 via-transparent to-transparent",
    dotColor: "bg-emerald-500"
  }
];

export default function IntroScrollytelling({ onComplete }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lastSlideActiveTime = useRef(0);
  const touchStartY = useRef(0);

  // Monitor slide intersection
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.6
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute("data-index"), 10);
          setActiveSlide(idx);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = containerRef.current.querySelectorAll("[data-slide]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (activeSlide === slides.length - 1) {
      lastSlideActiveTime.current = Date.now();
    }
    playIntroSound(activeSlide);
  }, [activeSlide]);

  // Matrix binary rain canvas animation for Slide 1
  useEffect(() => {
    if (!canvasRef.current || activeSlide !== 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const columns = Math.floor(width / 20);
    const yPositions = Array(columns).fill(0);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId;
    const draw = () => {
      ctx.fillStyle = "rgba(1, 3, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(6, 182, 212, 0.20)"; // Subtle Cyan binary
      ctx.font = "11px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * 20;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + 16;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSlide]);

  // Detect downward scroll on last slide to enter site
  const handleWheel = (e) => {
    if (activeSlide === slides.length - 1) {
      if (Date.now() - lastSlideActiveTime.current > 700) {
        if (e.deltaY > 15) {
          onComplete();
        }
      }
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (activeSlide === slides.length - 1) {
      if (Date.now() - lastSlideActiveTime.current > 700) {
        const touchEndY = e.touches[0].clientY;
        const diffY = touchStartY.current - touchEndY; // swiping upward
        if (diffY > 30) {
          onComplete();
        }
      }
    }
  };

  const handleNextSlide = (idx) => {
    const el = containerRef.current.querySelector(`[data-index="${idx}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] bg-[#01030a] text-white overflow-hidden flex select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Immersive CRT overlay effects */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.20] crt-overlay" />
      <div className="absolute inset-0 pointer-events-none z-50 crt-noise" />

      {/* Modern Minimalist Side Nav Dots */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6 items-center">
        {slides.map((s) => (
          <button
            key={s.id}
            onClick={() => handleNextSlide(s.id)}
            className="group flex items-center justify-center h-6 w-6 relative focus:outline-none"
            aria-label={`Visualizar slide ${s.id + 1}`}
          >
            <div className={`h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
              activeSlide === s.id 
                ? `${s.dotColor} border-transparent scale-125 shadow-[0_0_10px_currentColor]`
                : "border-white/20 bg-transparent group-hover:border-white/50"
            }`} />
          </button>
        ))}
      </div>

      {/* Floating minimal scroll feedback at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 flex flex-col items-center gap-1.5 text-[9px] font-mono text-white/40 tracking-[0.3em]">
        {activeSlide === slides.length - 1 ? (
          <span className="animate-pulse">ROLA PARA ENTRAR NO PORTAL</span>
        ) : (
          <span>ROLA PARA CONTINUAR</span>
        )}
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* Full screen slides container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
      >
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;
          return (
            <section
              key={slide.id}
              data-slide
              data-index={slide.id}
              className="w-full h-full snap-start snap-always relative flex items-center justify-center px-6 sm:px-12 lg:px-24"
            >
              {/* Slide specific gradient colors */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${slide.color} opacity-35 pointer-events-none transition-all duration-1000`} />
              
              {/* Optional Canvas rain on Tech Slide */}
              {index === 1 && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>
              )}

              {/* Pulsing radar circles on Last Slide */}
              {index === 2 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-20">
                  <div className="w-[380px] h-[380px] rounded-full border border-primary/20 animate-[ping_4s_infinite] absolute" />
                  <div className="w-[240px] h-[240px] rounded-full border border-primary/30 animate-[ping_5s_infinite] absolute" />
                </div>
              )}

              {/* Grid overlay */}
              <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px"
                }}
              />

              {/* Premium split-screen slide layout with dynamic active animation */}
              <motion.div 
                animate={{ 
                  opacity: isActive ? 1 : 0.08,
                  scale: isActive ? 1 : 0.95,
                  y: isActive ? 0 : 35
                }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="max-w-6xl w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 text-left"
              >
                
                {/* Left side: Premium typography */}
                <div className="lg:col-span-6 space-y-6">
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white uppercase text-balance">
                    {slide.title}
                  </h2>

                  <p className="text-gray-400 text-sm sm:text-base font-semibold max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                </div>

                {/* Right side: Premium visual presentation card */}
                <div className="lg:col-span-6 flex justify-center items-center">
                  <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.65)] group">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

              </motion.div>

            </section>
          );
        })}
      </div>

    </div>
  );
}
