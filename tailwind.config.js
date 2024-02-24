/** @type {import('tailwindcss').Config} */

import  daizy from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daizy],

  variants: {
    extend: {
        display: ["group-hover"],
    },
},
}

