/** @type {import('tailwindcss').Config} */
/* Configuração typescript -> Informa a IDE o tipo esperado para a configuração TYPESCRIPT  */

export default {
  // Específica aonde o tailwind deve procurar as classes css
  content: [ 
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  
  // Usado para modificar e adicionar classes ao tailwind
  theme: {
    extend: {
      colors: {
        'blue-1': '#92BDF9',
        'blue-2': '#3380F3',
        'blue-3': '#316FF6',
        'blue-4': '#1941BA',
        'blue-5': '#2E3D4A',
        'white-1': '#F3F3F3',
        'white-2': '#E8E8E8',
        'dark-primary': '#282828',
      },
    },
  },

  plugins: [],
}

