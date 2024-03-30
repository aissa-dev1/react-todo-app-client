/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f1f1f1",
        "accent-color": "#7e22ce",
      },
    },
  },
  plugins: [],
};
