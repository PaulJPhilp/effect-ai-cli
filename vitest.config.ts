import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/__tests__/test-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "src/__tests__/",
        "**/*.test.ts",
        "**/*.spec.ts",
        "scripts/",
      ],
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
