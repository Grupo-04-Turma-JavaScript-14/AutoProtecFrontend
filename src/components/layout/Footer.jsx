import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react"
import Logo from "../common/Logo.jsx"

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Sobre Nós", to: "/sobre" },
  { label: "Seguros", to: "/seguros" },
  { label: "Contato", to: "/contato" },
  { label: "Trabalhe Conosco", to: "/trabalhe-conosco" },
]

const insurances = ["Seguro Auto", "Seguro Moto", "Seguro Frota", "Proteção Premium"]

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Youtube, label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo />
            <p className="text-muted text-sm leading-relaxed mt-5 max-w-xs">
              Proteção inteligente para quem valoriza o que realmente importa. Segurança,
              confiança e tecnologia para te levar mais longe.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-5">
              LINKS RÁPIDOS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Seguros */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-5">
              NOSSOS SEGUROS
            </h4>
            <ul className="space-y-3">
              {insurances.map((i) => (
                <li key={i}>
                  <Link
                    to="/seguros"
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fale conosco */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-5">
              FALE CONOSCO
            </h4>
            <ul className="space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>(11) 4000-1234</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>contato@autoprotect.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>
                  Av. Paulista, 1000 - São Paulo, SP
                  <br />
                  CEP: 01310-100
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted">
          <p>© 2026 AutoProtect Seguros. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
