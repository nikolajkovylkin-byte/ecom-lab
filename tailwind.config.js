/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#101116",
          950: "#0b0c0f",
          900: "#101116",
          800: "#16171d",
          700: "#1d1e26",
          600: "#2a2b33",
          500: "#3a3b45",
        },
        paper: {
          DEFAULT: "#F3F3F1",
          dim: "#B7B8C0",
          faint: "#7C7D87",
        },
        signal: {
          DEFAULT: "#E23B34",
          dim: "#8C2622",
          soft: "#3A1E1D",
        },
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
