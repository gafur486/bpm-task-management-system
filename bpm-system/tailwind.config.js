/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Banking-style brand palette (deep navy + gold accent)
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          500: '#1e40af',
          600: '#1d3a9e',
          700: '#1b3186',
          900: '#0f1f54',
        },
        gold: {
          400: '#e0b84d',
          500: '#caa233',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
