// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'tertiary': '#1E293B', // example color
        'green-pink-gradient': 'linear-gradient(90deg, #D53369 0%, #DAE2F8 100%)',
      },
    },
  },
  plugins: [],
};
