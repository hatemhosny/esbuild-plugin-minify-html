import { build } from "esbuild";
import rawCssPlugin from "../dist/index.mjs";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  plugins: [rawCssPlugin()],
  outfile: "dist/index.js",
  format: "esm",
});
