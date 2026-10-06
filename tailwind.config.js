/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Hind Siliguri"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        bdgreen: {
          50: '#eef8f3',
          100: '#d5efe0',
          500: '#006a4e', // Official Bangladesh green
          600: '#005941',
          700: '#004834',
        },
        bdred: {
          500: '#f42a41', // Official Bangladesh red
          600: '#d91f34',
        }
      }
    },
  },
  plugins: [],
}
