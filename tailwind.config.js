/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#854CE6",
        background: "#1C1C27",
        black: "#111111",
        text_primary: "#F2F3F4",
        text_secondary: "#b1b2b3",
        card: "#171721",
        card_light: "#191924",
        button: "#854CE6",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
