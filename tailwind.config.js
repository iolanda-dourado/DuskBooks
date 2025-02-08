/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'txt-title': ['Amarante, serif;'],
        'txt-body': ['Afacad, serif;'],
      },
      height: {
        'height90vh': '90vh',
      }
    },
  },
  plugins: [],
}
