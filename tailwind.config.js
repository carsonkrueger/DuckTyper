/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#343538",
        primary: "rgb(234,179,8)",
        secondary: "#686869",
        secondaryHighlight: "#4a4a4a",
        transparent: "rgba(0,0,0,0)",
      },
      fontFamily: {
        "roboto-mono": ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
