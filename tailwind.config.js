/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // include all React files
  ],
  theme: {
    extend: {
      colors: {
        purpleLight: "#47BFDF",
        purpleDark: "#4A91FF",
      },
    },
  },
  plugins: [],
};
