import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-surface to-surface-2 border border-border rounded-2xl p-8 lg:p-10">
          <div className="grid lg:grid-cols-[auto_1fr_auto] items-center gap-8">
            <img
              src="/images/cta-car.jpg"
              alt="Carro premium AutoProtect"
              className="hidden md:block w-48 h-28 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-balance">
                PRONTO PARA DIRIGIR COM TRANQUILIDADE?
              </h3>
              <p className="mt-2 text-muted text-sm">
                Faça uma cotação personalizada e descubra o plano ideal para você.
              </p>
            </div>
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white text-xs font-bold tracking-wider px-7 py-4 rounded transition-colors whitespace-nowrap"
            >
              FAZER SUA COTAÇÃO AGORA
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
