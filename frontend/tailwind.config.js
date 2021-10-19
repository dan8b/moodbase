module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    fill: ['responsive','hover','focus']
    // extend: {},
  },
  plugins: [],
}
