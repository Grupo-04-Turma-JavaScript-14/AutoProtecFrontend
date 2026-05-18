import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

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
]

export default function Plans() {
  const [activeDot, setActiveDot] = useState(0)

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-bold tracking-[0.25em] mb-5">
            NOSSOS SEGUROS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-balance">
            ESCOLHA O SEGURO IDEAL
            <br />
            PARA O <span className="text-accent">SEU MOMENTO.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isRed = plan.accent === "red"
            return (
              <article
                key={plan.name}
                className={`relative bg-surface/60 border rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 ${
                  isRed
                    ? "border-accent/40 card-glow-red"
                    : "border-primary/40 card-glow-blue"
                }`}
              >
                <header>
                  <div className="text-[10px] text-muted font-semibold tracking-[0.25em]">
                    {plan.type}
                  </div>
                  <h3 className="text-white font-extrabold text-2xl tracking-wide mt-1">
                    {plan.name}
                  </h3>
                </header>

                <div className="my-5 aspect-[4/3] overflow-hidden rounded-lg bg-surface-2">
                  <img
                    src={plan.image}
                    alt={`Imagem ilustrativa do plano ${plan.type} ${plan.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted leading-snug">
                      <span
                        className={`flex-shrink-0 mt-0.5 h-4 w-4 rounded-full flex items-center justify-center ${
                          isRed ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`group inline-flex items-center justify-between gap-2 w-full text-white text-xs font-bold tracking-wider px-5 py-3 rounded transition-colors ${
                    isRed
                      ? "bg-accent hover:bg-accent-hover"
                      : "bg-primary hover:bg-primary-hover"
                  }`}
                  aria-label={`Cotar agora ${plan.type} ${plan.name}`}
                >
                  COTAR AGORA
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </article>
            )
          })}
        </div>

        {/* Indicadores de carrossel (decorativos) */}
        <div className="flex justify-center gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveDot(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                activeDot === i ? "w-8 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
