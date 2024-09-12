/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b4385',
        secondary: '#1e1b4b',
        accent: '#4338ca',
        hoverBg: '#16366a',
        hoverSecondary: '#3d5aa0',
        textPrimary: '#ffffff',
        textSecondary: '#d1d1d1',
        background: '#252363',
        backgroundSecondary: '#f4f4f4',
        accentText: '#ff9800',
        inputBg: "#1e1b4b"
      },
      screens: {
        sm: '540px',
        md: '800px',
        lg: '1024px'
      },
      animation: {
        "progress-bar": "progress ",
        "accordion-down": "accordion-down .2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
        "slide-right": "slide-right 0.3s ease-out",
      },
      keyframes: {
        "progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "accordion-down": {
          from: { transform: "translateY(-5%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "slide-left": {
          from: { transform: "translateX(-40%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "slide-right": {
          from: { transform: "translateX(40%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "accordion-up": {
          from: { transform: "translateY(5%)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}

