/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04131f',
        mist: '#d8e6f2',
        cyan: '#7fe7ff',
        gold: '#ffd166',
        coral: '#ff7b72',
      },
      boxShadow: {
        glow: '0 0 40px rgba(127, 231, 255, 0.18)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(216, 230, 242, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 230, 242, 0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
