/** @type {import('tailwindcss').Config} */
/* Configuração typescript -> Informa a IDE o tipo esperado para a configuração TYPESCRIPT  */

export default {
  // Específica aonde o tailwind deve procurar as classes css
  content: [ 
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false,
  // Usado para modificar e adicionar classes ao tailwind
  theme: {
    extend: {
      colors: {
        'blue-1': '#92BDF9',
        "blue-1-dark": "#76A0E0",
        "blue-2": "#3380F3",
        "blue-2-dark": "#2865CC",
        "blue-3": "#316FF6",
        "blue-3-dark": "#2759CC",
        "blue-4": "#1941BA",
        "blue-4-dark": "#133392",
        "blue-5": "#2E3D4A",
        "blue-5-dark": "#242F3A",
        "white-1": "#F3F3F3",
        "white-1-dark": "#CCCCCC",
        "white-2": "#E8E8E8",
        "white-2-dark": "#BFBFBF",
        "dark-primary": "#282828",
        'dark-primary-op-1': 'rgba(40,40,40,.3)',
      },
      height: {
        '128':'32rem',
      },
    },
  },

  plugins: [],
}

