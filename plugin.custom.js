
const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addBase, addComponents, addUtilities, theme }) {
   addComponents({
      ".btn": {
         backgroundColor: theme("colors.white"),
         borderRadius: theme("borderRadius.lg"),
         padding: theme("spacing.6"),
         boxShadow: theme("boxShadow.xl"),
      },
   });
})