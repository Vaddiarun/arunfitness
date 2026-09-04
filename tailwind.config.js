/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#161826',
        surface: '#232532',
        ink: '#e9e9ed',
        divider: 'rgba(233,233,237,0.16)',
        neutral: {
          100: '#f3f5fe',
          200: '#e4e7f5',
          300: '#cfd3e5',
          400: '#b2b6ca',
          500: '#9397ab',
          600: '#75798c',
          700: '#595d6c',
          800: '#3f424d',
          900: '#292b31',
        },
        accent: {
          DEFAULT: '#9184d9',
          100: '#f5f4ff',
          200: '#e7e5fe',
          300: '#d2cefd',
          400: '#b5abfc',
          500: '#968ae0',
          600: '#796cbf',
          700: '#5d5294',
          800: '#423a6a',
          900: '#2b2741',
        },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
      },
      boxShadow: {
        sm: '0 0 0 1px #3f424d',
        md: '0 0 0 1px #595d6c, 0 6px 18px rgba(0,0,0,0.55)',
        lg: '0 0 0 1px #9397ab, 0 16px 40px rgba(0,0,0,0.65)',
      },
      keyframes: {
        akrise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        akline: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        akrise: 'akrise .7s ease both',
        akline: 'akline .8s .25s ease both',
      },
    },
  },
  plugins: [],
};
