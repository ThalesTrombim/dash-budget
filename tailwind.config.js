/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js.ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'bounce-top-normal': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(10%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'none',
          },
        },
        fadeInUpFaster: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'none',
          },
        },
        fadeInBackground: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOutBackground: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'bounce-top-normal': 'bounce-top-normal 0.9s ease 0s 1 normal both',
        fadeInUp: 'fadeInUp 1s both',
        fadeInUpFaster: 'fadeInUp 0.5s both',
        fadeInBackground: 'fadeInBackground 0.5s ease-in-out forwards',
        fadeOutBackground: 'fadeOutBackground 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
