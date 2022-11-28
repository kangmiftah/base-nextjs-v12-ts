/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./_layouts/**/*.{js,ts,jsx,tsx}",
   ],
   darkMode: false,
   // important:true,
   theme: {
      container: {
         padding: {
           DEFAULT: '5rem',
           'sm':'3rem',
           'xs': '3rem',
           'md': '3rem',
           'lg': '10rem',
         },
       },
      extend: {},
      
   },
   plugins: [
      require('@tailwindcss/typography'),
   ],
};
