module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {},
  },

  darkMode: 'class',
  
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
