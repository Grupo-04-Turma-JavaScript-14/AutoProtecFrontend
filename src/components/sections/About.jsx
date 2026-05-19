import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, ShieldCheck } from "lucide-react";

const imgDealership = "/images/about-dealership.jpg";
const imgPerson = "/images/about-person.jpg";

const stats = [
  { icon: Shield, value: "+15", label: "Anos de Experiência", description: "Atuação sólida e confiável" },
  { icon: Users, value: "+50K", label: "Clientes Protegidos", description: "Famílias e frotas seguras" },
  { icon: ShieldCheck, value: "100%", label: "Compromisso", description: "Atendimento ágil e real" },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 lg:py-32 relative overflow-hidden bg-transparent">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Visual Collage (Overlap layout) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Tech Grid Pattern overlay */}
            <div
              className="absolute -top-10 -left-10 h-40 w-40 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #1E5BFF 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
              aria-hidden="true"
            />
            
            <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-[1.1] md:aspect-square lg:aspect-[4/5] flex items-center justify-center">
              
              {/* Back Image: Dealership (Building base) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 w-[75%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
              >
                <img 
                  src={imgDealership} 
                  alt="AutoProtect Dealership" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Front Image: Person (Humanized element) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 right-0 w-[65%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] group z-10"
              >
                <img 
                  src={imgPerson} 
                  alt="AutoProtect Customer Service" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/80 to-transparent" />
              </motion.div>

              {/* Floating Shield Status Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-[35%] left-[-5%] z-20 bg-surface/85 backdrop-blur-xl border border-primary/30 rounded-xl p-4 shadow-[0_15px_30px_rgba(30,91,255,0.25)] flex items-center gap-3 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] font-black text-gray-500 tracking-widest uppercase">SISTEMA</div>
                  <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    PROTEÇÃO ATIVA
                  </div>
                </div>
              </motion.div>

              {/* Decorative floating outline box */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-dashed border-white/10 rounded-2xl pointer-events-none" />
            </div>

          </div>

          {/* Right Column: Editorial Copywriting & Stats */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              CONECTADOS COM VOCÊ // SOBRE NÓS
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter text-white"
            >
              CUIDAR DO SEU CAMINHO
              <br />
              É A NOSSA <span className="text-accent drop-shadow-[0_0_20px_rgba(255,44,44,0.3)] uppercase">DIRETRIZ.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-gray-400 text-sm sm:text-base leading-relaxed font-semibold tracking-wide"
            >
              A AutoProtect nasceu da união entre tecnologia de ponta e cuidado humanizado. Oferecemos uma infraestrutura de segurança robusta e imediata para que você possa rodar sem preocupações. Nosso foco é desburocratizar a proteção automotiva, entregando transparência e suporte 24 horas por dia.
            </motion.p>

            {/* Redesigned Premium Cards for Stats */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -4, borderColor: "rgba(30,91,255,0.3)" }}
                  className="bg-surface/30 backdrop-blur-xl border border-white/5 p-5 rounded-xl flex flex-col items-start transition-all duration-300"
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/5 border border-white/10 flex items-center justify-center text-primary mb-3">
                    <s.icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                  <div className="text-[9px] text-gray-500 font-semibold mt-0.5 leading-snug">
                    {s.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action Button inside About */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <a
                href="#contato"
                className="group relative inline-flex items-center justify-between gap-4 border border-white/10 hover:border-white/30 bg-transparent text-white text-[10px] font-black tracking-[0.25em] px-8 py-4.5 transition-all duration-300 active:scale-95 hover:bg-white/[0.02] uppercase"
              >
                SOLICITAR ATENDIMENTO IMEDIATO
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
