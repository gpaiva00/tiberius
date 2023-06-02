const { lighten, darken } = require('polished')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        darkBackground: '#090909',
        darkCardBackground: '#16181c',
        darkTextGray: '#acacac',
        darkBackgroundIconButton: '#2f3336',
        darkTextLight: '#f5f5f5',
        darkInputBackground: '#212327',
        darkButtonHover: darken(0.1, '#1d9bf0'),
        darkPrimary: '#1d9bf0',
        red: '#ef4444',
        gray: '#333',
        lightGray: '#e6e6e6',
        lightenGray: lighten(0.4, '#333'),
        primary: '#1d9bf0',
        lightenPrimary: lighten(0.4, '#1d9bf0'),
        header: '#F5F5F5',
        white: '#F5F5F5',
      },
      borderRadius: {
        default: '0.75rem',
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
        dark: '#2f3336',
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
