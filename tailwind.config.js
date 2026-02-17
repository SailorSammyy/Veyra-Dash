/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: '#5865F2',
        dark: '#0f172a',
        card: '#1e293b',
      }
    },
  },
  plugins: [],
}