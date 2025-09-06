/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // include all React files
  ],
  theme: {
    extend: {
      colors: {
        purpleLight: "#905AD4",
        purpleDark: "#513EB4",
        purpleDeep: "#3330A5",
      },
    },
  },
  plugins: [],
};
