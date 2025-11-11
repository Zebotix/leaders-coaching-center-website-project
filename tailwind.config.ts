/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        merriweather: ['var(--font-merriweather)', 'serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent-strong)',
        neutral: {
          DEFAULT: 'var(--color-neutral)',
        },
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
      },
      borderRadius: {
        md: 'var(--radius-md)',
      },
    },
  },
  plugins: [],
};
