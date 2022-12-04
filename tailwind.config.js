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
            DEFAULT: "3rem",
            sm: "3rem",
            xs: "3rem",
            md: "3rem",
            lg: "7rem",
            "2xl": "12rem",
         },
      },
      extend: {
         colors: {
            primary: {
               DEFAULT: "#2640d9",
               100: "#cce5ff",
               200: "#99caff",
               300: "#66b0ff",
               400: "#3395ff",
               500: "#007bff",
               600: "#0062cc",
               700: "#004a99",
               800: "#003166",
               900: "#001933",
            },
            secondary: {
               DEFAULT: "#6C757E",
               100: "#e2e3e5",
               200: "#c4c8cb",
               300: "#a7acb2",
               400: "#899198",
               500: "#6c757e",
               600: "#565e65",
               700: "#41464c",
               800: "#2b2f32",
               900: "#161719",
            },
            success: {
               DEFAULT: "#28a745",
               100: "#d4edda",
               200: "#a9dcb5",
               300: "#7eca8f",
               400: "#53b96a",
               500: "#28a745",
               600: "#208637",
               700: "#186429",
               800: "#10431c",
               900: "#08210e",
            },
            danger: {
               DEFAULT: "#dc3545",
               100: "#f8d7da",
               200: "#f1aeb5",
               300: "#ea868f",
               400: "#e35d6a",
               500: "#dc3545",
               600: "#b02a37",
               700: "#842029",
               800: "#58151c",
               900: "#2c0b0e",
            },
            warning: {
               DEFAULT: "#ffc107",
               100: "#fff3cd",
               200: "#ffe69c",
               300: "#ffda6a",
               400: "#ffcd39",
               500: "#ffc107",
               600: "#cc9a06",
               700: "#997404",
               800: "#664d03",
               900: "#332701",
            },
            info: {
               DEFAULT: "#17a2b8",
               100: "#d1ecf1",
               200: "#a2dae3",
               300: "#74c7d4",
               400: "#45b5c6",
               500: "#17a2b8",
               600: "#128293",
               700: "#0e616e",
               800: "#09414a",
               900: "#052025",
            },

         },
      },
   },
   plugins: [
      require("@tailwindcss/typography"),
      require("@tailwindcss/line-clamp"),
      require("./plugin.custom"),
   ],
};
