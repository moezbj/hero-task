/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: () => ({
        blue: {
          700: "#151927",
        },
        grey: {
          400: "#73859736",
          50: "#F6F6F6",
          100: "#EAF1FB",
          200: "#F6F8FC",
          300: "#444746",
        },

        white: "#ffff",
      }),
      colors: {
        blue: {
          700: "#151927",
          750: "#11113096",
        },
        orange: {
          100: "rgb(175, 76, 11)",
          DEFAULT: "#FB6D10",
        },
        grey: {
          50: "#F6F6F6",
          100: "#EAF1FB",
          150: "#F7F7FE",
          200: "#F6F8FC",
          250: "#D6D8D9",
          300: "#444746",
          350: "#B3B3B3",
          500: "#70707033",
          600: "#202124",
        },
        red: {
          100: "#E71A1AA6",
          DEFAULT: "#D85A5A",
          200: "#F54F4A",
          250: "#F75C3F",
          300: "#C33535",
          500: "#DC4242",
          550: "rgba(255,0,0)",
        },
      },
      opacity: {
        67: "0.67",
      },
      borderRadius: {
        inputBorder: "10px",
      },
    },
  },
  plugins: [],
};
