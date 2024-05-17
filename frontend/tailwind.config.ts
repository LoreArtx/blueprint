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
        "lazurite":"#2660A4",
        "olive":"#1F272B",
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
