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
        secondaryLowlight: "#424242",
        transparent: "rgba(0,0,0,0)",
      },
      fontFamily: {
        "roboto-mono": ["Roboto Mono", "monospace"],
        "Shadows-Into-Light": ["Shadows Into Light", "cursive"],
        pacifico: ["Pacifico", "cursive"],
      },
      keyframes: {
        "my-pulse": {
          "50%": {
            opacity: 0.4,
          },
        },
        shake: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(-5deg)" },
          "20%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(5deg)" },
          "40%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-5deg)" },
          "60%": { transform: "rotate(0deg)" },
          "70%": { transform: "rotate(5deg)" },
          "80%": { transform: "rotate(0deg)" },
          "90%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "pulse-fast": "my-pulse 1.3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 1s linear 1",
      },
    },
  },
  plugins: [],
};
