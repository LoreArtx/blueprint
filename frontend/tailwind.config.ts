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
        "lazurite":"#6F00FF",
        "olive":"#1F272B",
        "sea":"#15f4ee",
        "error":"#FF4400",
        "info":"#FFAE00",
        "success":"#66BF3C",
        "disabled":"#DDDDDD"
      }
    },
    backgroundImage: {
        'gradient-lazurite': 'linear-gradient(20deg, #6F00FF,#15f4ee, #15f4ee, #6F00FF)',
        'gradient-hover':'linear-gradient(20deg, #15f4ee,#15f4ee,#6F00FF,#15f4ee,#15f4ee)',
        'gradient-exit':'linear-gradient(34deg, #f2003c 29%, #ff00ff 89%)'
      },
  },
  plugins: [],
};
export default config;
