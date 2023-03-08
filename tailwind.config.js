/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        stretch1: {
          '0%': {transform: 'scaleY(1)'},
          '25%': {transform: 'scaleY(1.25)'},
          '50%': {transform: 'scaleY(1.5)'},
          '75%': {transform: 'scaleY(1.25)'},
          '100%': {transform: 'scaleY(1)'}
        },
        stretch2: {
          '0%': {transform: 'scaleY(1)'},
          '25%': {transform: 'scaleY(1)'},
          '50%': {transform: 'scaleY(1.25)'},
          '75%': {transform: 'scaleY(1.5)'},
          '100%': {transform: 'scaleY(1.25)'}
        },
        stretch3: {
          '0%': {transform: 'scaleY(1.25)'},
          '25%': {transform: 'scaleY(1)'},
          '50%': {transform: 'scaleY(1)'},
          '75%': {transform: 'scaleY(1.25)'},
          '100%': {transform: 'scaleY(1.5)'}
        }
      },
      animation: {
        'stretching1': 'stretch1 0.75s linear infinite',
        'stretching2': 'stretch2 0.75s linear infinite',
        'stretching3': 'stretch3 0.75s linear infinite'
      }
    },
  },
  plugins: [],
}