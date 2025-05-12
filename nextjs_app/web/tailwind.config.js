/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     /* Blue 600 */
        'primary-dark': '#1d4ed8', /* Blue 700 */
        'primary-light': '#3b82f6', /* Blue 500 */
        secondary: '#10b981',   /* Emerald 500 */
        'secondary-dark': '#059669', /* Emerald 600 */
        'secondary-light': '#34d399', /* Emerald 400 */
        accent: '#f59e0b',      /* Amber 500 */
      },
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.delay-200': {
          'animation-delay': '0.2s',
        },
        '.delay-400': {
          'animation-delay': '0.4s',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
