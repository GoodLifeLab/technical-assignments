const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "display-56-m": [
          "56px",
          { lineHeight: "140%", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-52-b": [
          "52px",
          { lineHeight: "146%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-44-b": [
          "44px",
          { lineHeight: "146%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-36-b": [
          "36px",
          { lineHeight: "140%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading1-32-b": [
          "32px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading2-28-b": [
          "28px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading3-24-b": [
          "24px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading4-20-b": [
          "20px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],

        "body1-18-b": [
          "18px",
          { lineHeight: "154%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body1-18-m": [
          "18px",
          { lineHeight: "154%", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "body1-18-r": [
          "18px",
          { lineHeight: "154%", letterSpacing: "-0.02em", fontWeight: "400" },
        ],

        "body2-16-b": [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body2-16-m": [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "body2-16-r": [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "body3-14-b": [
          "14px",
          { lineHeight: "146%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body3-14-m": [
          "14px",
          { lineHeight: "146%", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "body3-14-r": [
          "14px",
          { lineHeight: "146%", letterSpacing: "-0.02em", fontWeight: "400" },
        ],

        "caption1-12-b": [
          "12px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "caption1-12-m": [
          "12px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "500" },
        ],

        "caption2-10-b": [
          "10px",
          { lineHeight: "140%", letterSpacing: "0em", fontWeight: "700" },
        ],
        "caption2-10-m": [
          "10px",
          { lineHeight: "140%", letterSpacing: "0em", fontWeight: "500" },
        ],
      },

      colors: {
        btl: {
          "primary-100": "rgba(247, 248, 255, 1)",
          "primary-200": "rgba(231, 233, 255, 1)",
          "primary-300": "rgba(202, 206, 255, 1)",
          "primary-400": "rgba(155, 162, 255, 1)",
          "primary-500": "rgba(121, 131, 255, 1)",
          "primary-600": "rgba(88, 100, 255, 1)",
          "primary-700": "rgba(70, 80, 204, 1)",
          "primary-800": "rgba(53, 60, 153, 1)",
          "primary-900": "rgba(36, 41, 101, 1)",
          "primary-opacity-28": "rgba(121, 131, 255, 0.28)",
          "primary-opacity-4": "rgba(121, 131, 255, 0.04)",
          "primary-gradient-start": "rgba(88,100,255,1)",
          "primary-gradient-end": "rgba(125,211,252,1)",
          "grayscale-0": "rgba(255, 255, 255, 1)",
          "grayscale-100": "rgba(235, 235, 236, 1)",
          "grayscale-1000": "rgba(0, 0, 0, 1)",
          "grayscale-200": "rgba(216, 217, 218, 1)",
          "grayscale-300": "rgba(196, 196, 198, 1)",
          "grayscale-400": "rgba(173, 173, 176, 1)",
          "grayscale-50": "rgba(249, 249, 249, 1)",
          "grayscale-500": "rgba(141, 142, 146, 1)",
          "grayscale-600": "rgba(109, 111, 115, 1)",
          "grayscale-700": "rgba(88, 91, 95, 1)",
          "grayscale-800": "rgba(65, 67, 73, 1)",
          "grayscale-900": "rgba(44, 46, 52, 1)",
          "blue-100": "rgba(245, 251, 254, 1)",
          "blue-200": "rgba(225, 244, 252, 1)",
          "blue-300": "rgba(186, 230, 253, 1)",
          "blue-400": "rgba(125, 211, 252, 1)",
          "blue-500": "rgba(87, 193, 240, 1)",
          "blue-600": "rgba(14, 165, 233, 1)",
          "blue-700": "rgba(2, 132, 199, 1)",
          "blue-800": "rgba(2, 78, 120, 1)",
          "blue-900": "rgba(8, 47, 73, 1)",
          "blue-opacity-28": "rgba(56, 189, 248, 0.28)",
          "green-100": "rgba(244, 253, 252, 1)",
          "green-200": "rgba(223, 248, 246, 1)",
          "green-300": "rgba(193, 236, 232, 1)",
          "green-400": "rgba(146, 227, 219, 1)",
          "green-500": "rgba(77, 217, 203, 1)",
          "green-600": "rgba(26, 201, 185, 1)",
          "green-700": "rgba(9, 174, 162, 1)",
          "green-800": "rgba(29, 116, 111, 1)",
          "green-900": "rgba(40, 71, 70, 1)",
          "orange-100": "rgba(255, 248, 245, 1)",
          "orange-200": "rgba(255, 234, 225, 1)",
          "orange-300": "rgba(255, 212, 194, 1)",
          "orange-400": "rgba(255, 173, 138, 1)",
          "orange-500": "rgba(255, 139, 90, 1)",
          "orange-600": "rgba(245, 117, 62, 1)",
          "orange-700": "rgba(179, 82, 31, 1)",
          "orange-800": "rgba(122, 60, 34, 1)",
          "orange-900": "rgba(72, 41, 28, 1)",
          "orange-opacity-28": "rgba(251, 146, 60, 0.28)",
          "red-100": "rgba(255, 246, 246, 1)",
          "red-200": "rgba(254, 229, 229, 1)",
          "red-300": "rgba(254, 202, 202, 1)",
          "red-400": "rgba(252, 165, 165, 1)",
          "red-500": "rgba(248, 113, 113, 1)",
          "red-600": "rgba(229, 78, 78, 1)",
          "red-700": "rgba(192, 66, 66, 1)",
          "red-800": "rgba(149, 64, 64, 1)",
          "red-900": "rgba(98, 50, 50, 1)",
          "grayscale-transparent-black-opacity-4": "rgba(0,0,0,0.04)",
          "grayscale-transparent-black-opacity-70": "rgba(0,0,0,0.7)",
          "grayscale-transparent-white-opacity-8": "rgba(255,255,255,0.08)",
          "grayscale-transparent-white-opacity-70": "rgba(255,255,255,0.7)",
        },

        "lucky-point": {
          100: "#D4D2E2",
          200: "#A9A5C4",
          300: "#7D77A7",
          400: "#524A89",
          500: "#271D6C",
          600: "#1F1756",
          700: "#171141",
          800: "#100C2B",
          900: "#080616",
        },
      },

      fontFamily: {
        serif: ["var(--font-notoserif)", ...fontFamily.serif],
        pretendard: ["Pretendard Variable", ...fontFamily.sans],
        sans: ["Pretendard Variable", ...fontFamily.sans],
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
      },

      boxShadow: {
        primary: ["0px 6px 32px 0px rgba(36, 41, 101, 0.08)"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-text-fill-stroke")(),
    require("@headlessui/tailwindcss"),
    require("tailwindcss-safe-area"),
  ],
}
