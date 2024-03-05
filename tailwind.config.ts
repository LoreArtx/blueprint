import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "night":"#0A090C",
        "milk":"#F0EDEE",
        "darkGreen":"#07393C",
        "lightGreen":"#2C666E",
        "sea":"#90DDF0",
        "error":"#FF4400",
        "info":"#FFAE00",
        "success":"#66BF3C",
        "disabled":"#DDDDDD"
      }
    },
  },
  plugins: [],
};
export default config;
