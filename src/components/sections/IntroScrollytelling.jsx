import React, { useState, useEffect, useRef } from "react";
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
  
  // Canvas references for backgrounds
  const spaceCanvasRef = useRef(null);
  const techCanvasRef = useRef(null);
  
  // Slide 1 Orbits
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  // Slide 3 Shields
  const shield1Ref = useRef(null);
  const shield2Ref = useRef(null);
  const shield3Ref = useRef(null);

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

  // Performance loops for Slide 1 & Slide 3 background shifts
  useEffect(() => {
    let t = 0;
    let scrollVelocity = 0;
    let lastScroll = 0;
    let animationFrameId;

    if (containerRef.current) {
      lastScroll = containerRef.current.scrollTop;
    }

    const animate = () => {
      let currentScroll = 0;
      if (containerRef.current) {
        currentScroll = containerRef.current.scrollTop;
      }
      const diff = currentScroll - lastScroll;
      scrollVelocity = scrollVelocity * 0.92 + diff * 0.08;
      lastScroll = currentScroll;

      // Speed accelerations based on scroll depth rate
      const speed = 0.45 + Math.abs(scrollVelocity) * 0.15;
      t += speed;

      // Slide 1 Orbits
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(-50%, -50%) rotate(${t * 0.05}deg)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(-50%, -50%) rotate(${-t * 0.08}deg)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(-50%, -50%) rotate(${t * 0.12}deg)`;
      }

      // Slide 3 Shields
      if (shield1Ref.current) {
        shield1Ref.current.style.transform = `rotate(${t * 0.04}deg) scale(${1 + Math.sin(t * 0.012) * 0.02})`;
      }
      if (shield2Ref.current) {
        shield2Ref.current.style.transform = `rotate(${-t * 0.07}deg) scale(${1 + Math.cos(t * 0.012) * 0.02})`;
      }
      if (shield3Ref.current) {
        shield3Ref.current.style.transform = `rotate(${t * 0.1}deg) scale(${1 + Math.sin(t * 0.012 + 1) * 0.02})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Slide 1: Space Starfield Warp Canvas (Stars move on their own, warp stretch when scrolling)
  useEffect(() => {
    if (!spaceCanvasRef.current) return;
    const canvas = spaceCanvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const starCount = 65;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      color: `rgba(147, 197, 253, ${Math.random() * 0.4 + 0.3})` // Blue-white stars
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let scrollVelocity = 0;
    let lastScroll = 0;
    let animationFrameId;

    if (containerRef.current) {
      lastScroll = containerRef.current.scrollTop;
    }

    const drawStars = () => {
      ctx.fillStyle = "rgba(1, 3, 10, 0.25)"; // Trail overlay
      ctx.fillRect(0, 0, width, height);

      let currentScroll = 0;
      if (containerRef.current) {
        currentScroll = containerRef.current.scrollTop;
      }
      const diff = currentScroll - lastScroll;
      scrollVelocity = scrollVelocity * 0.9 + diff * 0.1;
      lastScroll = currentScroll;

      stars.forEach((s) => {
        // Star movement on its own, plus acceleration depending on vertical scroll rate
        const warpMultiplier = 1 + Math.abs(scrollVelocity) * 0.35;
        s.y -= s.speed * warpMultiplier;

        // Reset if off-screen top
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        // Draw star, stretch vertically if warp speed is active (scrolling fast)
        ctx.beginPath();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.lineCap = "round";
        ctx.moveTo(s.x, s.y);
        
        // Stretch lines
        const stretch = Math.max(1, Math.abs(scrollVelocity) * 0.25);
        ctx.lineTo(s.x, s.y + stretch);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    drawStars();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSlide]);

  // Slide 2: Matrix falling binary canvas animation
  useEffect(() => {
    if (!techCanvasRef.current || activeSlide !== 1) return;
    const canvas = techCanvasRef.current;
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

      ctx.fillStyle = "rgba(6, 182, 212, 0.18)";
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

  const handleScroll = (e) => {
    const currentScroll = e.currentTarget.scrollTop;
    setScrollY(currentScroll);

    // Lock and exit site past threshold
    if (currentScroll >= 2.2 * vh) {
      onComplete();
      return;
    }

    const calculatedSlide = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(currentScroll / vh))
    );
    
    if (calculatedSlide !== activeSlide) {
      setActiveSlide(calculatedSlide);
    }
  };

  const handleNextSlide = (idx) => {
    const el = containerRef.current.querySelector(`[data-index="${idx}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#01030a] text-white overflow-hidden flex select-none">
      
      {/* CRT screen filters */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.16] crt-overlay" />
      <div className="absolute inset-0 pointer-events-none z-50 crt-noise" />

      {/* Slide 1 Background Visual: Floating Starfield & Orbit Rings */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeSlide === 0 ? 1 : 0 }}
      >
        {/* Floating space canvas starfield (Stars move dynamically on their own) */}
        <canvas ref={spaceCanvasRef} className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[90px] animate-[pulse_6s_infinite] pointer-events-none" />
        
        {/* Rotating orbital grids */}
        <div 
          ref={orb1Ref}
          className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-dashed border-blue-500/10 origin-center pointer-events-none"
        />
        <div 
          ref={orb2Ref}
          className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-blue-400/20 origin-center pointer-events-none"
        />
        <div 
          ref={orb3Ref}
          className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border-2 border-dashed border-blue-600/25 origin-center pointer-events-none"
        />
      </div>

      {/* Slide 2 Background Visual: 3D perspective cyber grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden"
        style={{ opacity: activeSlide === 1 ? 1 : 0 }}
      >
        <canvas ref={techCanvasRef} className="absolute inset-0 w-full h-full" />
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] border-t border-cyan-500/20 opacity-30 origin-bottom"
          style={{
            transform: `perspective(250px) rotateX(65deg) translateY(${(scrollY * 0.15) % 40}px)`,
            backgroundImage: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.08) 80%), repeating-linear-gradient(90deg, rgba(6,182,212,0.15) 0px, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(6,182,212,0.15) 0px, rgba(6,182,212,0.15) 1px, transparent 1px, transparent 40px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Slide 3 Background Visual: Concentric emerald shields */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 flex items-center justify-center"
        style={{ opacity: activeSlide === 2 ? 1 : 0 }}
      >
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[100px] animate-[pulse_8s_infinite]" />
        
        <div 
          ref={shield1Ref}
          className="w-[500px] h-[500px] rounded-full border border-dashed border-emerald-500/15 absolute origin-center"
        />
        <div 
          ref={shield2Ref}
          className="w-[360px] h-[360px] rounded-full border-2 border-emerald-400/20 absolute origin-center"
        />
        <div 
          ref={shield3Ref}
          className="w-[220px] h-[220px] rounded-full border border-dashed border-emerald-600/30 absolute origin-center"
        />
      </div>

      {/* Side dots */}
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

      {/* Navigation bottom tag */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 flex flex-col items-center gap-1.5 text-[9px] font-mono text-white/40 tracking-[0.3em]">
        {activeSlide === slides.length - 1 ? (
          <span className="animate-pulse">ROLE PARA BAIXO PARA ENTRAR</span>
        ) : (
          <span>ROLA PARA CONTINUAR</span>
        )}
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* Proximity snap scroll container */}
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
          const offset = scrollY - index * vh;
          const ratio = Math.max(-1, Math.min(1, offset / vh));
          const isActive = activeSlide === index;

          return (
            <section
              key={slide.id}
              data-slide
              data-index={slide.id}
              className="w-full h-full snap-start snap-always relative flex items-center justify-center px-6 sm:px-12 lg:px-24 overflow-hidden"
            >
              {/* Slide color aura glow */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${slide.color} opacity-40 pointer-events-none transition-all duration-1000`} />

              {/* Grid dots */}
              <div 
                className="absolute inset-0 opacity-[0.012] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px"
                }}
              />

              {/* Split layout content block: Left splits left, Right splits right when scrolling out */}
              <div 
                className="max-w-6xl w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 text-left transition-all duration-[750ms] ease-out"
                style={{
                  opacity: isActive ? 1 : 0.05,
                  transform: `scale(${isActive ? 1 : 0.94})`,
                  filter: `blur(${Math.abs(ratio) * 5}px)`
                }}
              >
                
                {/* Left side: Premium typography parallax */}
                <div 
                  className="lg:col-span-6 space-y-6 transition-transform duration-[600ms] ease-out"
                  style={{
                    transform: `translateX(${ratio * -120}px)`
                  }}
                >
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white uppercase text-balance">
                    {slide.title}
                  </h2>

                  <p className="text-gray-400 text-sm sm:text-base font-semibold max-w-xl leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Right side: Image frame with opposite direction horizontal glide */}
                <div 
                  className="lg:col-span-6 flex justify-center items-center transition-transform duration-[600ms] ease-out"
                  style={{
                    transform: `translateX(${ratio * 120}px) translateY(${ratio * -30}px) rotate(${-ratio * 4}deg)`
                  }}
                >
                  <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

              </div>

            </section>
          );
        })}

        {/* Extra buffer height block for scroll brake */}
        <div className="w-full h-[35vh] snap-start bg-transparent" />
      </div>

    </div>
  );
}
