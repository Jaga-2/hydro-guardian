/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe0fe',
          300: '#93cffe',
          400: '#62b3fb',
          500: '#3b8df7',
          600: '#256de5',
          700: '#1f57c9',
          800: '#1f47a4',
          900: '#203f80'
        }
      }
    }
  },
  plugins: []
};
