/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        gloria: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          ".message-card": {
            "background-color": "#1f2937",
          },
          ".message-card-hover": {
            "background-color": "#1A1D24",
          },
          ".messages-container": {
            "background-color": "#1C1E25",
          },
          ".message-box": {
            "background-color": "#15171C",
          },
        },
      },
    ],
  },
};
