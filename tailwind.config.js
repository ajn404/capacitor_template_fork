/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,vue}'],
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        192: '48rem',
      },
    },
  },
  plugins: [],
}
