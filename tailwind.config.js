/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        wabi: {
          red: '#B23A2E',
          darkred: '#8E2E24',
          bg: '#FAF6EF',
          card: '#FFFFFF',
          border: '#E5DED3',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans TC"',
          '"Trip Fallback"',
          '"PingFang TC"',
          '"Noto Sans CJK TC"',
          '"Microsoft JhengHei"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
