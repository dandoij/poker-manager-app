/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  corePlugins: {
    backdropFilter: true,
  },
  variants: {
    extend: {
      backdropFilter: ['hover', 'focus'],
    }
  }
}

