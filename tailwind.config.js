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
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(2.5) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        stamp: 'stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        pop: 'pop 0.25s ease-out',
      }
    },
  },
  plugins: [],
}
