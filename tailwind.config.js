const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--satoshi-font)", ...fontFamily.sans],
      },
      borderRadius: {
        smPlus: "4px",
      },
      backgroundImage: {
        ad: "url('/img/ad-image.png')",
      },
      keyframes: {
        overlayShow: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        contentShow: {
          "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
