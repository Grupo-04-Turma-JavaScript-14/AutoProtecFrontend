import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { playHoverSound } from "../layout/Navbar";

const plans = [
  {
    type: "SEGURO",
    name: "AUTO",
    image: "/images/car-auto.jpg",
    accent: "blue",
    features: [
      "Cobertura contra roubo e furto",
      "Danos a terceiros",
      "Assistência 24h completa",
      "Vidros, faróis e retrovisores",
    ],
  },
  {
    type: "SEGURO",
    name: "MOTO",
    image: "/images/moto.jpg",
    accent: "red",
    features: [
      "Cobertura contra roubo e furto",
      "Danos a terceiros",
      "Assistência 24h completa",
      "Acessórios e equipamentos",
    ],
  },
  {
    type: "SEGURO",
    name: "FROTA",
    image: "/images/frota.jpg",
    accent: "blue",
    features: [
      "Gestão completa da sua frota",
      "Cobertura personalizada",
      "Redução de custos",
      "Assistência 24h especializada",
    ],
  },
  {
    type: "PROTEÇÃO",
    name: "PREMIUM",
    image: "/images/premium-shield.jpg",
    accent: "red",
    features: [
      "Cobertura completa e ampliada",
      "Carro reserva premium",
      "Assistência VIP 24h",
      "Atendimento prioritário",
    ],
  },
];

// Stagger Animation Variants (Improvement 5)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Plans() {
  const [activeDot, setActiveDot] = useState(0);

  const handleScrollToQuote = () => {
    const el = document.getElementById("contato");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="seguros" className="py-20 lg:py-28 relative z-10 bg-transparent">
      {/* Decorative top section neon line divider (Improvement 6) */}
      <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 0.8 }}
            className="text-primary text-[10px] font-black uppercase mb-4"
          >
            NOSSOS SEGUROS // SHOWROOM
          </motion.p>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter text-white">
            ESCOLHA O SEGURO IDEAL
            <br />
            PARA O <span className="text-accent drop-shadow-[0_0_25px_rgba(255,44,44,0.35)]">SEU MOMENTO.</span>
          </h2>
        </div>

        {/* Staggered Card Grid Container (Improvement 3 & 5) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan) => {
            const isRed = plan.accent === "red";
            return (
              <motion.article
                key={plan.name}
                variants={cardVariants}
                // Glassmorphic Spring Hover Magnetic Tilt Scale (Improvement 1 & 4)
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  boxShadow: isRed 
                    ? "0 20px 40px rgba(255,44,44,0.15)" 
                    : "0 20px 40px rgba(30,91,255,0.15)",
                }}
                onMouseEnter={playHoverSound}
                className={`relative overflow-hidden aspect-[3/4] border rounded-xl flex flex-col justify-between p-7 transition-all duration-300 group bg-[#0A1230]/55 backdrop-blur-xl shadow-2xl ${
                  isRed 
                    ? "hover:border-accent/40 border-white/10" 
                    : "hover:border-primary/40 border-white/10"
                }`}
              >
                {/* Full-bleed background sports car model image with elegant black cover gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={`Imagem ilustrativa do plano ${plan.type} ${plan.name}`}
                    className="w-full h-full object-cover opacity-20 group-hover:scale-110 group-hover:opacity-35 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020512] via-[#020512]/80 to-transparent" />
                </div>

                {/* Cyber laser top active bar on hover (Improvement 1) */}
                <div className={`absolute top-0 left-0 right-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                  isRed ? "bg-accent shadow-[0_0_10px_#FF2C2C]" : "bg-primary shadow-[0_0_10px_#1E5BFF]"
                }`} />

                {/* Floating Content above Background Cover */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <header className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-black text-gray-500 tracking-[0.25em] uppercase block mb-1">
                        {plan.type}
                      </span>
                      <h3 className="text-white font-black text-3.5xl tracking-wide uppercase leading-none">
                        {plan.name}
                      </h3>
                    </div>
                    {/* Security stamp badge widget on hover (Improvement 4) */}
                    <div className={`p-1.5 bg-white/[0.02] border border-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isRed ? "text-accent border-accent/20" : "text-primary border-primary/20"
                    }`}>
                      <ShieldCheck className="h-4.5 w-4.5" />
                    </div>
                  </header>

                  <ul className="space-y-4 my-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3.5 text-xs text-gray-400 font-semibold tracking-wide leading-snug">
                        <span
                          className={`flex-shrink-0 mt-2 h-1.5 w-1.5 rounded-full ${
                            isRed 
                              ? "bg-accent shadow-[0_0_8px_rgba(255,44,44,0.7)]" 
                              : "bg-primary shadow-[0_0_8px_rgba(30,91,255,0.7)]"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* High-end button slide hover transition */}
                  <button
                    type="button"
                    onClick={handleScrollToQuote}
                    className={`group/btn relative inline-flex items-center justify-between gap-2 w-full text-white text-[11px] font-black tracking-[0.2em] px-7 py-5 border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 rounded-none uppercase focus:outline-none`}
                    aria-label={`Cotar agora ${plan.type} ${plan.name}`}
                  >
                    <span className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 z-0 ${
                      isRed ? "bg-accent" : "bg-primary"
                    }`} />
                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                      COTAR MODELO
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveDot(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all focus:outline-none ${
                activeDot === i ? "w-8 bg-primary" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
