// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-verde": "#A3D9A5", // Verde pastel suave
        "primary-marron": "#C8A27A", // Marrón claro tipo beige
        "primary-blanco": "#FFFFFF", // Blanco puro
        "secondary-celeste": "#A7D8F5", // Celeste pastel
        "secondary-amarillo": "#F9E4A3", // Amarillo pastel suave
        "terciario-gris": "#D9D9D9", // Gris claro pastel
        "terciario-blanco": "#FAFAF7", // Blanco cálido
      },
      backgroundImage:{
        'gestion':"url('/assets/img/foto.jpg')"
      }
    },
  },
  plugins: [],
};
