import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { playHoverSound } from "../layout/Navbar";

const STEPS = [
  "SEC: DECRYPTING REGIONAL SHIELD NODES [AES-256]...",
  "SYS: ESTABLISHING SECURE PROTOCOLS...",
  "CALCULANDO APÓLICE ELITE...",
  "100% CONCLUÍDO. ATIVANDO COBERTURA PREMIUM..."
];

export default function CTA() {
  const [plate, setPlate] = useState("");
  const [status, setStatus] = useState("idle"); // idle, checking, success, error
  const [stepIdx, setStepIdx] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");

  useEffect(() => {
    if (status !== "checking") return;

    setStepIdx(0);
    setProgressMsg(STEPS[0]);

    const interval = setInterval(() => {
      setStepIdx((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length) {
          clearInterval(interval);
          setStatus("success");
          
          // Dispatch global custom event for playing success synth beeps (from Navbar context)
          window.dispatchEvent(new CustomEvent("play-success-sound"));
          return prev;
        }
        setProgressMsg(STEPS[next]);
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [status]);

  const handleConsult = (e) => {
    e.preventDefault();
    if (!plate || plate.trim().replace("-", "").length !== 7) {
      setStatus("error");
      return;
    }
    setStatus("checking");
  };

  return (
    <section id="contato" className="py-20 lg:py-28 relative z-10 bg-transparent">
      {/* Decorative top section neon line divider (Improvement 6) */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mainframe Interactive Console container */}
        <div className="relative overflow-hidden bg-[#0A1230]/55 border border-white/10 backdrop-blur-xl rounded-2xl p-8 lg:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          {/* Cyber TV overlay lines inside the console */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%]" />
          
          {/* Laser Scanning line effect sweeping vertically inside the card when active (Improvement 2) */}
          {status === "checking" && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "450px" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_15px_#06B6D4] z-20 pointer-events-none"
            />
          )}

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-16">
            
            {/* Left Column: Premium Direct Copywriting */}
            <div className="text-left">
              <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[0.95]">
                O SEU PRÓXIMO KM
                <br />
                COMEÇA <span className="text-primary select-none drop-shadow-[0_0_20px_rgba(30,91,255,0.4)]">AQUI.</span>
              </h3>
              
              <p className="mt-5 text-gray-400 text-sm leading-relaxed font-semibold max-w-md">
                Ative sua cobertura de elite em minutos. Digite a placa do seu veículo abaixo para que nossa inteligência de mainframe consulte as taxas de chassi e calcule sua apólice premium.
              </p>

              {/* Dynamic stats tracker (Improvement 6) */}
              <div className="mt-8 flex gap-8 border-t border-white/[0.08] pt-6 text-[10px] font-mono text-gray-500">
                <div>
                  <span>NODE: </span>
                  <span className="text-white font-bold">AP-SP // SAO PAULO</span>
                </div>
                <div>
                  <span>CRYPT: </span>
                  <span className="text-[#06B6D4] font-bold">AES-256</span>
                </div>
                <div>
                  <span>LATENCY: </span>
                  <span className="text-emerald-400 font-bold">0.03ms</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity License Plate Simulator & Interactive widget */}
            <div className="flex flex-col items-center lg:items-end justify-center w-full">
              <div className="w-full max-w-sm bg-zinc-950/80 border border-white/10 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {status === "idle" || status === "error" ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleConsult}
                      className="space-y-5"
                    >
                      <span className="text-[9px] font-black text-gray-500 tracking-[0.2em] uppercase block text-left">
                        ESTAÇÃO DE LEITURA DE PLACA
                      </span>

                      {/* Brazil Mercosul License Plate Container with Glow Input border (Improvement 5) */}
                      <div className="relative bg-white border-4 border-zinc-900 rounded-lg p-1.5 shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary">
                        {/* Mercosul top blue banner */}
                        <div className="bg-[#1D4ED8] text-white flex justify-between items-center px-4 py-0.5 rounded-sm select-none">
                          <span className="text-[7px] font-black tracking-widest font-sans">BRASIL</span>
                          <span className="text-[7px] font-bold tracking-wider font-sans">MERCOSUL</span>
                        </div>
                        {/* Plate characters input */}
                        <div className="mt-2 flex justify-center items-center">
                          <input
                            type="text"
                            maxLength={8}
                            placeholder="ABC1D23"
                            value={plate}
                            onChange={(e) => setPlate(e.target.value.toUpperCase())}
                            className="w-full bg-transparent text-center font-mono font-black text-3xl tracking-[0.3em] uppercase text-zinc-900 focus:outline-none placeholder-zinc-300"
                          />
                        </div>
                      </div>

                      {status === "error" && (
                        <p className="text-xs text-red-500 font-bold text-center animate-bounce">
                          Por favor, digite uma placa válida com 7 caracteres!
                        </p>
                      )}

                      <button
                        type="submit"
                        onMouseEnter={playHoverSound}
                        className="group w-full inline-flex items-center justify-between bg-primary hover:bg-primary/90 text-white text-[10px] font-black tracking-[0.2em] px-6 py-4.5 transition-all duration-300 rounded-none uppercase focus:outline-none"
                      >
                        CONSULTAR APÓLICE
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.form>
                  ) : status === "checking" ? (
                    <motion.div 
                      key="checking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-10 space-y-4"
                    >
                      <Loader2 className="h-10 w-10 text-[#06B6D4] animate-spin" />
                      <div className="text-center font-mono space-y-1">
                        <span className="text-[9px] text-gray-500 tracking-widest uppercase block">DESCRIPTOGRAFANDO PLACA</span>
                        <p className="text-xs text-white font-bold animate-pulse">{progressMsg}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                    >
                      <CheckCircle className="h-12 w-12 text-emerald-400 animate-bounce" />
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-white uppercase tracking-wider">APÓLICE CALCULADA!</h4>
                        <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                          Sua proposta premium foi calculada com 100% de sucesso. Entraremos em contato em breve!
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setPlate("");
                        }}
                        className="mt-3 text-[9px] font-black tracking-widest text-primary hover:text-white uppercase transition-colors focus:outline-none"
                      >
                        Realizar Nova Simulação
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
