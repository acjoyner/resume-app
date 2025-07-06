/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan HTML and TypeScript files in src for Tailwind classes
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define 'Inter' font family
      },
    },
  },
  plugins: [],
}
