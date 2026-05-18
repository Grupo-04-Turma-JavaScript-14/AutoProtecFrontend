# 🛡️ AutoProtect // Elite Security Mainframe Portal

Uma interface cyberpunk-editorial de altíssimo luxo integrada com **React Three Fiber (WebGL)**, **Web Audio API** e **Framer Motion**. Este portal foi desenvolvido sob medida para redefinir o conceito de proteção veicular nacional com um visual tático brutalista, limpo e completamente imersivo.

---

## 📽️ Demonstração Oficial (GIF/WebP)

![AutoProtect Premium Mainframe Dashboard](./public/images/silk_weave_revert.webp)

---

## 🔮 Arquitetura de Pastas & Estrutura do Projeto

Abaixo está o mapa completo da estrutura de arquivos da aplicação, projetada de forma modular e altamente desacoplada para otimização de performance e legibilidade:

```bash
AutoProtecFrontend/
├── public/
│   ├── images/
│   │   ├── silk_weave_revert.webp  # Animação oficial de demonstração
│   │   └── ...                     # Ativos e modelos de veículos
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── Logo.jsx            # Marca vetorial da AutoProtect
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Header com Live Clock UTC e Sintetizador Web Audio
│   │   │   └── Footer.jsx          # Rodapé brutalista de rodagem rápida
│   │   ├── sections/
│   │   │   ├── Hero.jsx            # Headline principal, CTAs e Projetor de Holograma
│   │   │   ├── About.jsx           # Seção "Sobre Nós" / Mainframe de Diferenciais
│   │   │   ├── Plans.jsx           # Grid com Staggered Spring cards de seguros
│   │   │   └── CTA.jsx             # Estação de placa Mercosul com varredura laser
│   │   └── three/
│   │       └── GlobalBackground3D.jsx # Seda digital 3D fluida de inércia e scroll
│   ├── App.jsx                     # Preloader sequencial criptográfico e EQ HUD
│   ├── main.jsx                    # Ponto de montagem da árvore React
│   └── index.css                   # Definições do design system e CRT scanlines
├── package.json                    # Dependências e scripts de desenvolvimento
├── vite.config.js                  # Configurações do Vite compiler
└── README.md                       # Documentação técnica do sistema
```

---

## 🚀 As 10 Melhorias Visuais de Luxo Implementadas

Para atingir a excelência audiovisual digna de prêmios internacionais de web design (estilo Stripe e Awwwards), integramos as seguintes 10 melhorias visuais de luxo no sistema:

1. **Glassmorphic Card Magnetic Scale Hover (`Plans.jsx`):** Os cartões de plano utilizam molas do Framer Motion para realizar um efeito de mola magnética suave de elevação tridimensional e zoom ao passar o mouse.
2. **Dynamic Cyber Active Laser Line (`Plans.jsx`):** Ao passar o mouse nos cartões, uma linha de neon ativa (vermelha ou azul dependendo do plano) surge no topo do card brilhando intensamente.
3. **Framer Motion Staggered Grid (`Plans.jsx`):** Os cartões não surgem todos de uma vez; eles carregam em cascata tridimensional utilizando atrasos de spring escalonados extremamente refinados.
4. **Selo 'ShieldCheck' Flutuante Interativo (`Plans.jsx`):** Um ícone de escudo verificado em formato micro surge no canto superior direito das pílulas dos cartões ao passar o mouse.
5. **Interactive Sliding Button Hover (`Plans.jsx`):** O botão de cotação possui um preenchimento interno em cor sólida (vermelho/azul) que desliza de baixo para cima acompanhando a direção em mola ao passar o mouse.
6. **Digital Scanning Laser Sweep Bar (`CTA.jsx`):** Quando você digita uma placa e clica para simular a apólice, uma linha laser ciano brilhante varre verticalmente o console de leitura simulando um leitor cibernético real.
7. **Pulsing Focus Input Neon Rings (`CTA.jsx`):** O input da placa Mercosul ganha anéis de foco neon azulados ao ser clicado, casando com a identidade tática da blindagem.
8. **Live Waveform HUD Equalizer (`App.jsx`):** Adicionamos 5 pequenas barras de onda equalizadoras que pulsam ritmicamente dentro do círculo de carregamento do Preloader durante o boot.
9. **Real-time Cryptographic Random Scrambler (`App.jsx`):** Os logs de inicialização realizam um efeito de criptografia incrível, decodificando caracteres aleatórios de terminal rapidamente até revelar as mensagens limpas.
10. **Inertia Parallax Scroll Integration (`GlobalBackground3D.jsx`):** O rolar da página agora deforma e rotaciona o tecido 3D fisicamente através de constantes físicas ligadas às coordenadas do window scroll!

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React, Vite, TailwindCSS (for rapid atomic layout structure)
- **3D Engine:** React Three Fiber (R3F), Three.js (WebGL)
- **Motion:** Framer Motion (spring engines & staggered cascades)
- **Audio Synthesizer:** Web Audio API (Sawtooth Oscillators, LFO lowpass filters)
- **Icons:** Lucide React

---

## 💻 Instalação & Execução Local

Para rodar o portal do mainframe da AutoProtect na sua máquina local, siga os passos abaixo:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento local:**
   ```bash
   npm run dev
   ```

3. **Abra a aplicação no navegador:**
   Acesse o endereço padrão indicado pelo compilador: [http://localhost:5173/](http://localhost:5173/)
