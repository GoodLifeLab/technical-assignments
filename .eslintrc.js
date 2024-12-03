module.exports = {
  extends: [
    "next",
    "prettier",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "prefer-const": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "tailwindcss/no-contradicting-classname": "warn",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
}
