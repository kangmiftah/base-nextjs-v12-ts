/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/_layouts/**/*.{js,ts,jsx,tsx}",
   ],
   darkMode: false,
   // important:true,
   theme: {
      container: {
         padding: {
           DEFAULT: '3rem',
           'sm':'3rem',
           'xs': '3rem',
           'md': '3rem',
           'lg': '7rem',
           '2xl': '12rem'
         },
       },
      extend: {},
      
   },
   plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/line-clamp'),
   ],
};
