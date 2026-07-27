/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
import defaultTheme from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";
import tailwindCssAnimated from "tailwindcss-animated";

export default {
  content: [
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  darkMode: "class",
  // mode: 'jit',
  theme: {
    // /assets/images/center-profile.jpeg
    extend: {
      fontFamily: {
        Lato: "Lato",
        Judson: "Judson",
        Domine: "Domine",
        Roboto: "Roboto",
        Oswald: "Oswald",
        Exo: "Exo/ 2, Helvetica, Neue, Arial,sans-serif",
        Helvetica: "Helvetica",
        sans: ["Open Sans", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        // sans: ['Nunito Sans', 'sans-serif'],

        "apple-system": [
          "Apple-System",
          "Arial",
          "Helvetica",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "STXihei",
          "sans-serif",
          "Roboto",
          "Neue",
          "Judson",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      profileFontSize: {
        fontSize: "normal",
      },
      colors: {
        lighten: "#F5F7FA",
        // sidebarBg: "#303840",
        sidebarBg: "rgb(10,31,52)",
        // sidebarSubMenuBg: "#272C33",
        sidebarSubMenuBg: "rgb(10,31,52)",
        menuItemColor: "rgba(172,182,191,.5)",
        menuItemIcon: "rgba(172,182,191,.2)",
        menuItemTitle: "#949799",
        menuDropdownBg: "#272C33",
        scrollbarColor: "#7D8084",
        btnColor: "#00BCC2",
        sidebarInpColor: "#272c34",
        sidebarInptextColor: "#949595",

        // nextuitab
        tablistcolor: "#f6f7fa",
        tabcursorcolor: "#4ba2ee",
        tablistbordercolor: "#e0e2e6",
        tablistUnselectedcolor: "#9b9d9f",

        //sidebart
        // sidebarLineColor: "#2e3033",
        sidebarLineColor: "#616363",

        // chat screen theme
        chatsidebar: "#324249",
        "chatsidebar-add": "#ff9b44",
        "chatsidebar-more": "#f62d51",

        // social screen theme
        mainColor: "#058ac9",
        bgLightColor: "#edf7fa",
        textLight: "#a4cee9",
        "main-text-color": "#66778c",
        "post-react-color": "#fbfdfe",
        inputLight: "#3296cf",
        xinputLight: "#edf7fc",
        bgDarkColor: "#242f43",
        cardDarkColor: "#112032",
        // social screen theme end

        // chat
        chatoverlay: "rgba(0,0,0,.5)",
        chatactive: "#78c13a",
        chatinactive: "#828a91",
        supportIconBg: "rgb(50 39 66 / var(--tw-bg-opacity))",
      },
      screens: {
        xlg: "1662px",
        xxlg: "1700px",
        xxl: "1374px",
        xm: "1400px",
        sz: "1200px",
        xmd: "1360px",
        xxd: "1450px",
        xx: "1500px",
        semi: "1310px",
        subsemi: "1247px",
        brk: "1160px",

        ...defaultTheme.screens,
      },
      dropShadow: {
        1: "0px 1px 0px #E2E8F0",
        2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
      },
      boxShadow: {
        default: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
        sidebar:
          "0 3px 3px -2px rgba(0,0,0,.1), 0 3px 4px 0 rgba(0,0,0,.04), 0 1px 8px 0 rgba(0,0,0,.02);",
        chatsidebar: "0 .5rem 1rem rgba(39,44,51,.15)!important",
        messagecard:
          "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02);",
      },
      keyframes: {
        // Define a keyframe for the bounce effect
        bounceEvery5: {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY(-25%)" },
          "20%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        // Create an animation that runs for 5 seconds infinitely
        "bounce-5": "bounceEvery5 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    scrollbar,
    nextui({
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#00bcc2",
              foreground: "#fff",
            },
          },
        },
      },
    }),
    tailwindCssAnimated,
  ],
};
