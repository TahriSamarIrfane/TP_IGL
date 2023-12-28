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
        'darkPink':'#EC3870',
        'black':'#000000',
        'white':'#FFFFFF',
        'pink':'#FFE8F2',
        'grey':'#8A8785',
        'lightGrey':'#ECECEC',
        'lightPink':'#FFE8F280',
        'darkGery':"#505050",
      },

    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],

}


