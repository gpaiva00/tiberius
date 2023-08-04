const { lighten, darken } = require('polished')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f2f2f7',
        },
        dark: {
          background: '#000000',
        },
      },
      borderRadius: {
        default: '0.625rem',
      },
      boxShadow: {
        default: '50px 50px 100px #c6c6c6, -50px -50px 100px #e9e9e9;',
      },
      borderWidth: {
        default: '0.0625rem',
        divider: '0.0625rem',
      },
      borderColor: {
        default: '#e6e6e6',
        dark: {
          gray: '#2f3336',
        },
        divider: '#e8e8e8',
      },
      height: {
        listBody: '30rem',
        cardFooter: '5rem',
        inputControl: '2.5rem',
      },
    },
  },
  plugins: [],
}
