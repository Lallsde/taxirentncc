/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7F27',  // Il colore arancione che stiamo usando
        background: '#000000', // Sfondo nero
        card: {
          DEFAULT: '#18181B',  // Sfondo delle card (zinc-900)
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#27272A',  // zinc-800
          foreground: '#A1A1AA'  // zinc-400
        }
      },
    },
  },
  plugins: [],
}
