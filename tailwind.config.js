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
      'black': '#333D54',
      'red': '#FE4B4B',
      'green': '#28F995',
      'blue': '#3965FF',
      'gray-primary': '#A8B3CC',
      'gray-secondary': '#D9D9D9',
    },
    extend: {},
  },
  plugins: [],
}

