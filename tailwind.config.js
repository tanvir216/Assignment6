/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#ccff00",
          dark: "#a8d400",
        },
        ink: {
          950: "#0a0a0b",
          900: "#111113",
          850: "#16161a",
          800: "#1c1c21",
          700: "#26262d",
          600: "#34343d",
          500: "#4a4a54",
          400: "#6b6b76",
          300: "#9a9aa4",
          200: "#c4c4cc",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(204,255,0,0.15), 0 8px 30px rgba(204,255,0,0.08)",
      },
    },
  },
  plugins: [],
};
