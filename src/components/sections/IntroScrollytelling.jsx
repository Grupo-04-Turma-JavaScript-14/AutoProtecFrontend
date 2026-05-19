import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Web Audio API Synthesizer player for audio feedback
const playIntroSound = (index) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    
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
    
    if (index === 2) {
      const notes = [523.25, 659.25, 783.99, 1046.50];
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
    color: "from-blue-950/40 to-black",
    dotColor: "bg-primary"
  },
  {
    id: 1,
    title: "MONITORAMENTO ATIVO DE ELITE",
    description: "Sistemas em tempo real conectados a satélites de posicionamento global. Segurança imediata, reboque sob demanda e neutralização inteligente de sinistros em minutos.",
    image: "/images/supercar_dark.png",
    color: "from-cyan-950/30 to-black",
    dotColor: "bg-cyan-500"
  },
  {
    id: 2,
    title: "SEGURANÇA INVISÍVEL ATÉ SER NECESSÁRIA",
    description: "Sua tranquilidade é nossa prioridade absoluta. A cobertura AutoProtect está ativa e pronta para acompanhar você em todos os seus caminhos.",
    image: "/images/about-person.jpg",
    color: "from-emerald-900/20 to-black",
    dotColor: "bg-emerald-500"
  }
];

export default function IntroScrollytelling({ onComplete }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(900);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lastSlideActiveTime = useRef(0);
  const touchStartY = useRef(0);

  // Generate deterministic particles for Slide 1
  const particles = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.8 + 0.2
    }))
  );

  useEffect(() => {
    if (containerRef.current) {
      setVh(containerRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setVh(containerRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (e) => {
    const currentScroll = e.currentTarget.scrollTop;
    setScrollY(currentScroll);

    // Calculate current slide based on scroll midpoint
    const calculatedSlide = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(currentScroll / vh))
    );
    
    if (calculatedSlide !== activeSlide) {
      setActiveSlide(calculatedSlide);
    }
  };

  useEffect(() => {
    if (activeSlide === slides.length - 1) {
      lastSlideActiveTime.current = Date.now();
    }
    playIntroSound(activeSlide);
  }, [activeSlide]);

  // Matrix falling binary canvas animation for Slide 1
  useEffect(() => {
    if (!canvasRef.current || activeSlide !== 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const columns = Math.floor(width / 22);
    const yPositions = Array(columns).fill(0);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId;
    const draw = () => {
      ctx.fillStyle = "rgba(1, 3, 10, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(6, 182, 212, 0.18)"; // Cyan digital rain
      ctx.font = "10px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * 22;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > 150 + Math.random() * 8000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + 15;
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

  // Detect downward scroll past last slide
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
        const diffY = touchStartY.current - touchEndY; // swipe up
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
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.16] crt-overlay" />
      <div className="absolute inset-0 pointer-events-none z-50 crt-noise" />

      {/* Slide 1 Background Visual: Floating Star Field & Rotating Orb */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeSlide === 0 ? 1 : 0 }}
      >
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[90px] animate-[pulse_6s_infinite]" />
        {particles.current.map((p) => {
          // Calculate vertical position offset dynamically based on scrollY
          const dynamicY = (p.y - (scrollY * p.speed * 0.05)) % 100;
          return (
            <div
              key={p.id}
              className="absolute bg-blue-400 rounded-full opacity-35"
              style={{
                left: `${p.x}%`,
                top: `${dynamicY < 0 ? dynamicY + 100 : dynamicY}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                boxShadow: "0 0 8px rgba(96,165,250,0.6)"
              }}
            />
          );
        })}
      </div>

      {/* Slide 2 Background Visual: 3D perspective cyber floor grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden"
        style={{ opacity: activeSlide === 1 ? 1 : 0 }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Dynamic perspective grid shifting with scrollY */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] border-t border-cyan-500/20 opacity-30 origin-bottom"
          style={{
            transform: `perspective(250px) rotateX(65deg) translateY(${(scrollY * 0.15) % 40}px)`,
            backgroundImage: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.08) 80%), repeating-linear-gradient(90deg, rgba(6,182,212,0.15) 0px, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(6,182,212,0.15) 0px, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Slide 3 Background Visual: Magnetic concentric radar ripples */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 flex items-center justify-center"
        style={{ opacity: activeSlide === 2 ? 1 : 0 }}
      >
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px] animate-[pulse_8s_infinite]" />
        <div className="w-[450px] h-[450px] rounded-full border border-emerald-500/10 animate-[ping_4s_infinite] absolute" />
        <div className="w-[300px] h-[300px] rounded-full border border-emerald-500/15 animate-[ping_5s_infinite] absolute" />
        <div className="w-[150px] h-[150px] rounded-full border border-emerald-500/20 animate-[ping_6s_infinite] absolute" />
      </div>

      {/* Side Dots indicator */}
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

      {/* Full screen slides container with proximity snap for soft scroll deceleration */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-auto scroll-smooth relative"
        style={{ 
          scrollSnapType: "y proximity",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {slides.map((slide, index) => {
          // Calculate the relative scroll offset ratio for this slide
          const offset = scrollY - index * vh;
          const ratio = Math.max(-1, Math.min(1, offset / vh));
          const isActive = activeSlide === index;

          return (
            <section
              key={slide.id}
              data-slide
              data-index={slide.id}
              className="w-full h-full snap-start snap-always relative flex items-center justify-center px-6 sm:px-12 lg:px-24"
            >
              {/* Slide specific aura base color gradients */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${slide.color} opacity-40 pointer-events-none transition-all duration-1000`} />

              {/* Grid dots backdrop */}
              <div 
                className="absolute inset-0 opacity-[0.012] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px"
                }}
              />

              {/* Split layout content block with high-end parallax styling */}
              <div 
                className="max-w-6xl w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 text-left transition-all duration-[800ms] ease-out"
                style={{
                  opacity: isActive ? 1 : 0.06,
                  transform: `translateY(${ratio * 60}px) scale(${isActive ? 1 : 0.94})`,
                  filter: `blur(${Math.abs(ratio) * 4}px)`
                }}
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

                {/* Right side: Parallax layout image frame */}
                <div className="lg:col-span-6 flex justify-center items-center">
                  <div 
                    className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-transform duration-[600ms] ease-out"
                    style={{
                      transform: `translateY(${ratio * -30}px) rotate(${-ratio * 2}deg)`
                    }}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-[4000ms] filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

              </div>

            </section>
          );
        })}
      </div>

    </div>
  );
}
