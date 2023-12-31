/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        'darkPink':'#DF1477',
        'black':'#000000',
        'white':'#FFFFFF',
        'pink':'#FFE8F2',
        'grey':'#8A8785',
        'lightGrey':'#ECECEC',
        'lightPink':'#FFE8F280',
        'darkGery':"#505050",
        /* For the gradient parts*/
        //light gradient
        'GLbleu':'rgba(27, 189, 233, 0.25)',
        'GLpink':'rgba(223, 20, 119, 0.36)',
        'GLyellow':'rgba(253, 220, 105, 0.74)',
        //dark gradient
        'GDbleu':'rgba(27, 189, 233, 0.87)',
        'GDpink':'rgba(223, 21, 118, 0.69)',
        'GDyellow':'rgba(255, 209, 119, 0.86)',
      },

    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-gradient'),
  ],

}


