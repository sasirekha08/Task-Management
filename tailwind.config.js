const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#B9EDDD',
                secondary: '#569DAA',
                'dark-primary': '#0c1811',
                'dark-secondary': '#438964',
            },
        },
        screens: {
            xs: '580px',
            ...defaultTheme.screens,
        },
    },
    plugins: [],
}
