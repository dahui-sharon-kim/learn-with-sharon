/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["PretendardVariable", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".rotate-x-0": {
          transform: "rotateX(0deg)",
        },
        ".rotate-x-180": {
          transform: "rotateX(180deg)",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
