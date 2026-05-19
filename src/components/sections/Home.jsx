import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Headphones, Car, BadgeDollarSign } from "lucide-react";
import Hero from "./Hero";
import { playHoverSound } from "../layout/Navbar";

const benefits = [
  {
    icon: ShieldCheck,
    title: "PROTEÇÃO COMPLETA",
    subtitle: "Segurança 360°",
    description: "Coberturas completas e sob medida para colisões, roubos, furtos, incêndios e danos a terceiros.",
    glow: "hover:shadow-[0_0_50px_-12px_rgba(30,91,255,0.3)] hover:border-primary/30"
  },
  {
    icon: Headphones,
    title: "ASSISTÊNCIA 24H",
    subtitle: "Sempre Disponível",
    description: "Atendimento ultra-rápido via canais digitais e reboque imediato onde quer que você esteja.",
    glow: "hover:shadow-[0_0_50px_-12px_rgba(255,44,44,0.2)] hover:border-accent/30"
  },
  {
    icon: Car,
    title: "COBERTURA NACIONAL",
    subtitle: "Sem Fronteiras",
    description: "Proteção e assistência assegurada em todo o território nacional com a máxima qualidade.",
    glow: "hover:shadow-[0_0_50px_-12px_rgba(30,91,255,0.3)] hover:border-primary/30"
  },
  {
    icon: BadgeDollarSign,
    title: "JUSTO & TRANSPARENTE",
    subtitle: "Custo-Benefício Real",
    description: "Planos sob medida e franquia facilitada que cabem perfeitamente nas suas necessidades diárias.",
    glow: "hover:shadow-[0_0_50px_-12px_rgba(255,44,44,0.2)] hover:border-accent/30"
  },
];

export default function Home() {
  return (
    <div className="relative w-full bg-transparent">
      {/* Immersive Hero Component */}
      <Hero />

      {/* Redesigned Premium Benefits Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/[0.05]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] text-primary tracking-[0.25em] font-extrabold uppercase mb-3"
          >
            POR QUE ESCOLHER A AUTOPROTECT
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
          >
            DIFERENCIAIS QUE DEFINEM O
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">PADRÃO PREMIUM</span> DE PROTEÇÃO.
          </motion.h2>
        </div>

        {/* Continuous Editorial Grid (Brutalist Luxury) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/[0.06] rounded-2xl overflow-hidden bg-[#0A1230]/40 backdrop-blur-md">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              onMouseEnter={playHoverSound}
              className="relative p-8 lg:p-10 flex flex-col justify-between items-start text-left border-b lg:border-b-0 border-white/[0.06] last:border-b-0 lg:border-r lg:last:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&]:border-r border-white/[0.06] group hover:bg-white/[0.02] transition-all duration-500 cursor-pointer"
            >
              {/* Subtle top indicator line on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              
              <div>
                {/* Large Editorial Index */}
                <div className="text-3xl font-black text-white/5 tracking-wider font-mono mb-8 group-hover:text-primary/20 transition-colors duration-500">
                  0{idx + 1}
                </div>
                
                {/* Content */}
                <span className="text-[8px] font-black text-gray-500 tracking-[0.25em] uppercase block mb-2">{b.subtitle}</span>
                <h3 className="text-white font-black text-base tracking-wider mb-4 group-hover:text-white transition-colors duration-300">
                  {b.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                  {b.description}
                </p>
              </div>

              {/* Bottom Icon with micro-rotation */}
              <div className="mt-10 w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-primary transition-all duration-500 self-end">
                <b.icon className="h-5 w-5 transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
