/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    colors: {
      'white': '#fff',
      'green': '#28F995',
      'black': '#333D54',
      'black-hover': '#222939',
      'red': '#FE4B4B',
      'red-hover': '#E13434',
      'blue': '#3965FF',
      'blue-hover': '#3156D8',
      'gray': {
        DEFAULT: '#A8B3CC',
        2: '#D9D9D9'
      },
    },
    fontSize: {
      'sm': ['0.75rem', '1red'],
      'md': ['1rem', '1.25rem'],
      'lg': ['1.25rem', '1.5rem'],
      'xl': ['1.5rem', '1.75rem'],
    },
    extend: {},
  },
  plugins: [],
}

