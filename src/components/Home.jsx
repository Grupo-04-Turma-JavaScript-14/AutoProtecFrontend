import { ArrowRight, Clock, Shield, MapPin, Award, ShieldCheck, Headphones, Car, BadgeDollarSign } from "lucide-react"

const trust = [
  { icon: Clock, title: "ATENDIMENTO", value: "24 HORAS" },
  { icon: Shield, title: "COBERTURA", value: "NACIONAL" },
  { icon: Award, title: "ASSISTÊNCIA", value: "PREMIUM" },
]

const benefits = [
  {
    icon: ShieldCheck,
    title: "PROTEÇÃO COMPLETA",
    description: "Coberturas completas para colisões, roubos, furtos e danos a terceiros.",
  },
  {
    icon: Headphones,
    title: "ASSISTÊNCIA 24H",
    description: "Atendimento rápido onde você estiver, com suporte completo.",
  },
  {
    icon: Car,
    title: "COBERTURA NACIONAL",
    description: "Proteção em todo o Brasil com a qualidade que você merece.",
  },
  {
    icon: BadgeDollarSign,
    title: "MELHOR CUSTO-BENEFÍCIO",
    description: "Planos personalizados cabendo no seu bolso e na sua necessidade.",
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero principal */}
      <div className="relative hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative z-10">
              <p className="text-primary text-sm font-bold tracking-[0.25em] mb-5">
                PROTEÇÃO INTELIGENTE
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
                SEGURANÇA QUE
                <br />
                TE LEVA <span className="text-accent">MAIS LONGE.</span>
              </h1>
              <p className="mt-6 text-muted text-base lg:text-lg max-w-md leading-relaxed">
                Tecnologia, segurança e cobertura premium para quem exige tranquilidade todos os dias.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-wider px-7 py-4 rounded transition-colors"
                >
                  FAZER COTAÇÃO
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 border border-border hover:border-primary hover:bg-surface text-white text-xs font-bold tracking-wider px-7 py-4 rounded transition-colors"
                >
                  CONHECER PLANOS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {trust.map((t) => (
                  <div key={t.title} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-primary">
                      <t.icon className="h-4 w-4" />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[10px] text-muted tracking-widest font-semibold">
                        {t.title}
                      </div>
                      <div className="text-xs text-white font-bold tracking-wider">
                        {t.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full" aria-hidden="true" />
              <img
                src="/images/hero-car.jpg"
                alt="Carro esportivo preto protegido por escudo de segurança digital"
                className="relative w-full h-auto rounded-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Banda de benefícios */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="bg-surface/80 border border-border/60 rounded-xl p-6 lg:p-8 backdrop-blur">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
            {benefits.map((b) => (
              <div key={b.title} className="px-6 py-6 sm:py-2 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-primary mb-4">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-white font-bold text-sm tracking-wider mb-2">
                  {b.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed max-w-[180px]">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
