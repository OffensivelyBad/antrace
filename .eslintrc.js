module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react-hooks/recommended"],
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": "error",
  },
};