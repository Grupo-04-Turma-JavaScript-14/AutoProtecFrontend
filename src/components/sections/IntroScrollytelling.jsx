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

// Custom heading component with magnetic repulsion and soft return zero-gravity physics
function FloatingTitle({ text }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: null, y: null, width: 0, height: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: null, y: null, width: 0, height: 0 });
  };

  const words = text.split(" ");
  let globalCharCounter = 0;

  return (
    <h2 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white uppercase text-balance cursor-default select-none flex flex-wrap gap-x-[0.25em] gap-y-3.5 relative z-10"
    >
      {words.map((word, wIdx) => {
        const letters = Array.from(word);
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {letters.map((char, lIdx) => {
              const currentIdx = globalCharCounter++;
              
              // Slow space floating wave frequency
              const randomYShift = Math.sin(currentIdx * 0.4) * 2;
              
              let pushX = 0;
              let pushY = 0;
              let isUnderForce = false;

              if (mousePos.x !== null && mousePos.width > 0) {
                // Estimate character coordinate relative to parent boundary
                const letterX = (currentIdx / text.length) * mousePos.width;
                const letterY = mousePos.height / 2;

                const dx = letterX - mousePos.x;
                const dy = letterY - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 180; // Proximity influence threshold

                if (dist < radius) {
                  isUnderForce = true;
                  const force = (radius - dist) / radius;
                  const angle = Math.atan2(dy, dx);
                  // Displace letter away from cursor
                  pushX = Math.cos(angle) * force * 45;
                  pushY = Math.sin(angle) * force * 25;
                }
              }

              return (
                <motion.span
                  key={lIdx}
                  className="inline-block origin-center"
                  animate={{
                    x: pushX,
                    y: pushY + randomYShift,
                    scale: isUnderForce ? 1.08 : 1,
                    textShadow: isUnderForce 
                      ? "0 0 16px rgba(255,255,255,0.6)" 
                      : "0 0 0px rgba(255,255,255,0)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 18, // Super soft low-tension spring for continuous float feel
                    damping: 12    // Smooth deceleration ensures slow, gradual recovery back to 0
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}

export default function IntroScrollytelling({ onComplete }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(900);
  
  const containerRef = useRef(null);
  
  // Canvas references for backgrounds
  const spaceCanvasRef = useRef(null);
  const techCanvasRef = useRef(null);
  const shieldCanvasRef = useRef(null);
  
  // Slide 1 Orbits
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

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

  // Slide 1 Background rotating orbits loop
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

      const speed = 0.45 + Math.abs(scrollVelocity) * 0.15;
      t += speed;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(-50%, -50%) rotate(${t * 0.05}deg)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(-50%, -50%) rotate(${-t * 0.08}deg)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(-50%, -50%) rotate(${t * 0.12}deg)`;
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
      color: `rgba(147, 197, 253, ${Math.random() * 0.4 + 0.3})`
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
      ctx.fillStyle = "rgba(1, 3, 10, 0.25)";
      ctx.fillRect(0, 0, width, height);

      let currentScroll = 0;
      if (containerRef.current) {
        currentScroll = containerRef.current.scrollTop;
      }
      const diff = currentScroll - lastScroll;
      scrollVelocity = scrollVelocity * 0.9 + diff * 0.1;
      lastScroll = currentScroll;

      stars.forEach((s) => {
        const warpMultiplier = 1 + Math.abs(scrollVelocity) * 0.35;
        s.y -= s.speed * warpMultiplier;

        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.lineCap = "round";
        ctx.moveTo(s.x, s.y);
        
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

  // Slide 3: Interactive Cyber-Plexus Mesh Canvas
  useEffect(() => {
    if (!shieldCanvasRef.current || activeSlide !== 2) return;
    const canvas = shieldCanvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodeCount = 75;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 3.5 + 1.5
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

    const drawPlexus = () => {
      ctx.clearRect(0, 0, width, height);

      let currentScroll = 0;
      if (containerRef.current) {
        currentScroll = containerRef.current.scrollTop;
      }
      const diff = currentScroll - lastScroll;
      scrollVelocity = scrollVelocity * 0.94 + diff * 0.06;
      lastScroll = currentScroll;

      const speedMultiplier = 1 + Math.abs(scrollVelocity) * 0.45;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.32;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.x += n.vx * speedMultiplier;
        n.y += n.vy * speedMultiplier;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(52, 211, 153, 0.75)";
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
        ctx.arc(n.x, n.y, n.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawPlexus);
    };

    drawPlexus();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSlide]);

  const handleScroll = (e) => {
    const currentScroll = e.currentTarget.scrollTop;
    setScrollY(currentScroll);

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

      {/* Slide 1 Background Visual */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: activeSlide === 0 ? 1 : 0 }}
      >
        <canvas ref={spaceCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[90px] animate-[pulse_6s_infinite] pointer-events-none" />
        
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

      {/* Slide 2 Background Visual */}
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

      {/* Slide 3 Background Visual */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden"
        style={{ opacity: activeSlide === 2 ? 1 : 0 }}
      >
        <canvas ref={shieldCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[125px] animate-[pulse_7s_infinite] pointer-events-none" />
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

              {/* Split layout content block */}
              <div 
                className="max-w-6xl w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10 text-left transition-all duration-[750ms] ease-out"
                style={{
                  opacity: isActive ? 1 : 0.05,
                  transform: `scale(${isActive ? 1 : 0.94})`,
                  filter: `blur(${Math.abs(ratio) * 5}px)`
                }}
              >
                
                {/* Left side: Premium typography with letter hover spread expansion */}
                <div 
                  className="lg:col-span-6 space-y-6 transition-transform duration-[600ms] ease-out"
                  style={{
                    transform: `translateX(${ratio * -120}px)`
                  }}
                >
                  <FloatingTitle text={slide.title} />

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
