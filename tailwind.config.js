/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          dark: "#0C1A12",
          mid: "#1F3B2C",
          light: "#3E6B4E",
        },
        aurora: {
          blue: "#3A29FF",
          pink: "#FF94B4",
          red: "#FF3232",
        },
        calcifer: {
          core: "#FF8A00",
          glow: "#FFD369",
        },
        mist: {
          white: "#F8F7F4",
        },
      },
    },
  },
  plugins: [],
}
