import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, ArrowRight } from "lucide-react"
import Logo from "./Logo.jsx"

const links = [
  { label: "HOME", to: "/" },
  { label: "SOBRE NÓS", to: "/sobre" },
  { label: "SEGUROS", to: "/seguros" },
  { label: "CONTATO", to: "/contato" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" aria-label="AutoProtect Seguros - Home">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Navegação principal">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-sm font-semibold tracking-wider transition-colors hover:text-primary ${
                    isActive ? "text-white" : "text-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              type="button"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold tracking-wider px-6 py-3 rounded transition-colors"
            >
              SOLICITAR COTAÇÃO
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-6 pt-2 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 text-sm font-semibold tracking-wider rounded transition-colors ${
                    isActive ? "text-white bg-surface-2" : "text-muted hover:text-white hover:bg-surface"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold tracking-wider px-6 py-3 rounded transition-colors"
            >
              SOLICITAR COTAÇÃO
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
