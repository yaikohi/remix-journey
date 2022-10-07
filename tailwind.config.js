/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [		
    require("@catppuccin/tailwindcss")
    ({
    prefix: 'ctp',
    defaultFlavour: "mocha",
  }),],
}