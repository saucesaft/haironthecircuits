module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.njk'
  ],
  theme: {
    extend: {
      fontFamily: {
        'chicago': ['Chicago', 'sans-serif']
      },
      backgroundImage: {
        'picnic': "url('/img/poolside-fm-martini-picnic.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
