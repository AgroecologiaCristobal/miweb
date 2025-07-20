    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
      ],
      theme: {
        extend: {
          colors: {
            cream: '#F5F5DC', // A light, warm cream color
            'dark-primary': '#0B2027', // Dark blue-green for primary text/elements
            'dark-secondary': '#34495E', // Slightly lighter dark for secondary text
            'green-700': '#2E8B57', // Forest green for accents/buttons
            'green-800': '#348C34', // Adjusted to a slightly brighter green for cards
            'green-900': '#1A363A', // Adjusted to a slightly less black, more green dark background
            'gold-200': '#FFD700', // Light gold for highlights - Adjusted for the request
            'gold-300': '#D4AF37', // Medium gold for stronger accents
            'gold-400': '#B8860B', // Darker gold for subtle touches
            'gold-500': '#DAA520', // Even darker gold, for buttons
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
          },
        },
      },
      plugins: [],
    }
    