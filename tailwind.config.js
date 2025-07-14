/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-900': '#0c1a1a',
        'green-800': '#122b2b',
        'green-700': '#1a3c3c',
        'green-600': '#225555',
        'green-500': '#2E8555',
        'gold-900': '#4d3800',
        'gold-500': '#FFD700',
        'gold-400': '#FFDE33',
        'gold-300': '#FFE566',
        'gold-200': '#FFEC99',
        'cream': '#FBF8F1',
        'dark-primary': '#1a3c3c',
        'dark-secondary': '#3a5a5a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}