/** @type {import('tailwindcss').Config} */
/* Configuração typescript -> Informa a IDE o tipo esperado para a configuração TYPESCRIPT  */

export default {
  // Específica aonde o tailwind deve procurar as classes css

  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'bg-blue-1',
      'bg-gray-500',
      'green-subject',
      'yellow-subject',
      'yellow-orange-subject',
      'red-subject',
      'blue-subject',
      'purple-subject',
      "orange-1",
    ],
  },
  content: [ 
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false,
  // Usado para modificar e adicionar classes ao tailwind
  theme: {
    extend: {
      colors: {
        "blue-1": '#92BDF9',
        "blue-1-dark": "#76A0E0",
        "blue-1-opacity": "rgba(148, 189, 249, .3)",
        "blue-2": "#3380F3",
        "blue-2-dark": "#2865CC",
        "blue-3": "#316FF6",
        "blue-3-dark": "#2759CC",
        "blue-4": "#1941BA",
        "blue-4-dark": "#133392",
        "blue-5": "#2E3D4A",
        "blue-5-dark": "#242F3A",
        "blue-5-opacity": "rgba(40,40,40,.3)",
        "white-1": "#F3F3F3",
        "white-1-dark": "#CCCCCC",
        "white-2": "#E8E8E8",
        "white-2-dark": "#BFBFBF",
        "white-opacity-15": 'rgba(255, 255, 255, .15)',
        "dark-primary": "#282828",
        'dark-primary-op-1': 'rgba(40,40,40,.3)',
        "black-opacity-65": 'rgba(0,0,0, .65)',
        "gray-1":"#797979",
        "red-1":"#FDEAEC",
        "red-2":"#F63131",
        "red-2-dark":"#CC2929",
        "purple-subject":"rgba(176, 108, 243, .7)",
        "red-subject":"rgba(243, 108, 108, .7)",
        "blue-subject":"rgba(108, 138, 243, .7)",
        "yellow-orange-subject":"rgba(243, 173, 108, .7)",
        "green-subject":"rgba(108, 243, 162, .7)",
        "yellow-subject":"rgba(241, 243, 108, .7)",
        "pink-subject":"rgba(246, 49, 187, .7)",
        "marine-blue-subject":"rgba(49, 211, 246, .7)",
        "orange-subject":"rgba(246, 108, 49, .7)",
        "green-yellow-subject":"rgba(148, 246, 49, .7)",
        "purple-pink-subject":"rgba(183, 49, 246, .7)",
        "red-pink-subject":"rgba(246, 49, 108, .7)",
        "orange-1":"#F66C31",
        "orange-1-dark":"#DA4100",
        "dark-op-2":"rgba(0,0,0, .35)",
      },
      height: {
        '0.3':'0.0875rem',
        '0.2':'0.075rem',
        '0.1':'0.0625rem',
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128':'32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      width: {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      maxWidth: {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      maxHeight: {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
      },
      minWidth: {
        '104': '26rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem',
        '208': '52rem',
        '224': '56rem',
        '240': '60rem',
        '13/12': '110%',
        '14/12': '125%',
        '15/12': '150%',
      },
      backgroundImage: {
        'gradient-blue-bottom': 'linear-gradient(180deg, hsla(208, 23%, 24%, 1) 0%, hsla(207, 23%, 26%, 1) 16%, hsla(208, 23%, 27%, 1) 34%, hsla(207, 24%, 29%, 1) 51%, hsla(207, 23%, 32%, 1) 63%, hsla(207, 23%, 37%, 1) 74%, hsla(208, 23%, 42%, 1) 89%, hsla(208, 23%, 44%, 1) 100%);',
        'gradient-blue-top':'linear-gradient(0deg, hsla(208, 23%, 24%, 1) 0%, hsla(207, 23%, 26%, 1) 16%, hsla(208, 23%, 27%, 1) 34%, hsla(207, 24%, 29%, 1) 51%, hsla(207, 23%, 32%, 1) 63%, hsla(207, 23%, 37%, 1) 74%, hsla(208, 23%, 42%, 1) 89%, hsla(208, 23%, 44%, 1) 100%);',
        'dotted-line': 'linear-gradient(90deg, black 50%, rgba(255, 255, 255, 0) 50%)',
      },
      borderWidth: {
        '1': '1px',
      },
      backgroundSize: {
        'dotted-line': '16px 2px',
      },
      screens: {
        '05xl': '1100px',
        'bs': '840px',
        'xs': '480px'
      },
      boxShadow: {
        'xl-right': '4px 0px 10px rgba(0, 0, 0, 0.4)',
        'xl-full': '0px 0px 30px rgba(0, 0, 0, .1)',
      },
      zIndex: {
        '100':'100',
        '110':'110'
      }
    },
  },

  plugins: [],
}

