/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F3',
        rose: '#E8B4B8',
        'rose-dark': '#C98B8E',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}
