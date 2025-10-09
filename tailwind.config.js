/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      borderRadius: { '2xl': '1rem' }
    },
  },
  plugins: [],
}
