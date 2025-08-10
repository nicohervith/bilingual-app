module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignora archivos compilados
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["error", { code: 120 }],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
};
