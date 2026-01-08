import { defineConfig } from "eslint/config";
import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  // Ignore build folders
  globalIgnores([".next/**", "out/**", "build/**", "node_modules/**", "dist/**", "next-env.d.ts"]),

  // Next.js core rules
  ...nextVitals,
  ...nextTs,

  // Custom rules for your project
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // --- Prettier formatting ---
      "prettier/prettier": "error",

      // --- TypeScript ---
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "off",

      // --- JavaScript best practices ---
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // --- React best practices ---
      "react/jsx-boolean-value": ["error", "never"],
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],

      // --- React Hooks ---
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // --- Next.js overrides ---
      "@next/next/no-img-element": "off",

      // --- Disable automatic import sorting ---
      "import/order": "off",
      "sort-imports": "off",
    },
  },

  // Must be last to override conflicting rules
  prettierConfig,
]);
