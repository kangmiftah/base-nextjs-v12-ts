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
      extend: {},
      
   },
   plugins: [
      require('@tailwindcss/typography'),
   ],
};
