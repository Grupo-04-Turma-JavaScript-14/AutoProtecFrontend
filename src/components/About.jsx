import { ArrowRight, Shield, Users, ShieldCheck } from "lucide-react"

const stats = [
  { icon: Shield, value: "+15", label: "Anos de Experiência" },
  { icon: Users, value: "+50K", label: "Clientes Protegidos" },
  { icon: ShieldCheck, value: "100%", label: "Compromisso com sua Segurança" },
]

export default function About() {
  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mosaico de imagens */}
          <div className="relative">
            <div
              className="absolute -top-6 -left-6 h-32 w-32 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, #1E5BFF 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-border row-span-2">
                <img
                  src="/images/about-person.jpg"
                  alt="Consultor de seguros AutoProtect sorrindo, pronto para atender"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="/images/about-dealership.jpg"
                  alt="Fachada da concessionária parceira AutoProtect Seguros"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="/images/cta-car.jpg"
                  alt="Carro premium segurado pela AutoProtect"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-4 left-6 bg-surface-2 border border-border rounded-xl px-5 py-3 flex items-center gap-3 shadow-xl">
              <Shield className="h-6 w-6 text-primary" />
              <div className="leading-tight">
                <div className="text-white font-bold text-sm">+15 ANOS</div>
                <div className="text-muted text-[10px] tracking-widest">DE EXPERIÊNCIA</div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div>
            <p className="text-primary text-sm font-bold tracking-[0.25em] mb-5">
              SOBRE NÓS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-balance">
              CUIDAR DE VOCÊ É
              <br />A NOSSA <span className="text-accent">MISSÃO.</span>
            </h2>
            <p className="mt-6 text-muted leading-relaxed max-w-xl">
              A AutoProtect Seguros nasceu com o propósito de oferecer segurança inteligente,
              atendimento humano e soluções modernas para proteger o que realmente importa: você
              e seu patrimônio.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-start">
                  <div className="h-11 w-11 rounded-full border border-border flex items-center justify-center text-primary mb-3">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-muted leading-tight mt-1 max-w-[140px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-10 group inline-flex items-center gap-3 border border-border hover:border-primary hover:bg-surface text-white text-xs font-bold tracking-wider px-7 py-4 rounded transition-colors"
            >
              SAIBA MAIS SOBRE NÓS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
