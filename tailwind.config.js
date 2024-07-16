/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a2e',
          card: '#16213e',
          text: '#ffffff',
          primary: '#0f3460',
          secondary: '#e94560',
        },
      },
    },
  },
  plugins: [],
};
