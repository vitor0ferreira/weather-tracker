/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'weatherPixelArt': "url('../public/assets/backgrounds/pixel_art_background.gif')", 
      },
      fontSize:{
        'vsm': "0.5rem",
      },
      animation: {
        colorPump: 'colorPump 2s ease-in-out infinite'
      },
      keyframes: {
        colorPump: {
          '0%, 100%': { filter: 'saturate(3)' },
          '50%': { filter: 'saturate(1.5)' },
        }
      }
    },
  },
  plugins: [],
}

