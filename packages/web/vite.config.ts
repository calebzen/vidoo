import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      api: path.resolve("./src/api/"),
      src: path.resolve("./src/"),
    },
  },
  build: {
    rollupOptions: {
      input: "./src/main.ts",
      output: {
        format: "esm",
        entryFileNames: "index.js",
        manualChunks: () => "index",
      },
    },
  },
});
