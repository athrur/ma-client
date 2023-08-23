/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'bbred': '#ff433d',
        'bbblue': '#0068ff',
        'bbteal': '#4af6c3',
        'bborange': '#fb8b1e',
      }
    }
  },
  plugins: [],
}