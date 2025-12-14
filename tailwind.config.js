/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
        cream: "#FDF6F0",
        lavender: "#9B87F5",
        deep: "#2D1B69",
        coral: "#FF9EB8",
        gold: "#F4C095",
      },
    },
    backgroundImage: {
      'gradient-hero': "linear-gradient(135deg, #fdf6f0 0%, #f8f0fb 100%)",
      'gradient-lavender': "linear-gradient(135deg, #9b87f5 0%, #c7b8ff 100%)",
      'gradient-coral': "linear-gradient(135deg, #ff9eb8 0%, #ffb8d3 100%)",
      'gradient-button': "linear-gradient(90deg, #9b87f5 0%, #ff9eb8 100%)",
    },
  },
},
plugins: [],
}