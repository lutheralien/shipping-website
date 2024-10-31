// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fedex: {
          purple: '#4D148C',
          orange: '#FF6600'
        }
      }
    },
  },
  plugins: [],
}