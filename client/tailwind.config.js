/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#d01110",
        secondary: "#fdb750"
      },
      fontFamily: {
        playwrite: ['Playwrite NZ', 'sans-serif'],
        logo: ["Delicious Handrawn", 'serif'],
        menuWrite: ['Playwrite IS', 'sans'],
        'ibm': '"IBM Plex Sans", sans-serif'
      },
    },
  },
  plugins: [],
}
