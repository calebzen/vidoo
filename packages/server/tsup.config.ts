import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  splitting: false,
  clean: true,
  target: "esnext",
  format: ["esm"],
  outDir: "dist",
  outExtension: ({ format }) =>
    format === "esm" ? { js: ".mjs" } : { js: ".cjs" },
  dts: true,
});
