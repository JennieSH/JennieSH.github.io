const { colors: defaultColors } = require("tailwindcss/defaultTheme");
const customColors = require("./assets/styleConfig.ts");

const colors = {
  ...defaultColors,
  ...customColors
};

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors,
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
