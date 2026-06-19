/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0a12",
          primary: "#00f0ff",
          secondary: "#ff007f",
          accent: "#9400d3",
          success: "#39ff14",
          text: "#e0e0ff",
        },
      },
      boxShadow: {
        neon: "0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(255, 0, 127, 0.2)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
