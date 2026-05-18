/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050B1F",
        surface: "#0A1230",
        "surface-2": "#0E1838",
        primary: "#1E5BFF",
        "primary-hover": "#1748D6",
        accent: "#FF2C2C",
        "accent-hover": "#E01F1F",
        muted: "#8A93A6",
        border: "#1A2547",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
