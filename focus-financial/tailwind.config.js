/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        focusPurpleDark: '#4B0082', // Indigo Purple
        focusPurple: '#7E22CE',     // Vivid Purple
        focusPurpleLight: '#A78BFA', // Soft Purple
        focusBlack: '#0A0A0A',       // Almost Black
        focusGray: '#1F2937',        // Dark Gray for card backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // modern clean font
      },
      backgroundImage: {
        'black-purple-gradient': 'linear-gradient(135deg, #0A0A0A, #4B0082, #7E22CE)',
      },
    },
  },
  plugins: [],
};
