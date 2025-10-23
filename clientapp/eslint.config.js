import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { ignores: ["**/vite.config.*", "**/setupTests.*", "**/*.test.tsx", "**/*.test.ts"] },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    plugins: { js },
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    }
  },
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  }
]);