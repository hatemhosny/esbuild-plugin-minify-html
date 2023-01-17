# esbuild-plugin-raw-css

esbuild plugin for importing css files as minified raw text.

## Usage

```css
/* base.css */
.one {
  background-color: "#fff";
}
```

```js
// index.js
import base from "./base.css?raw";
console.log(base); // ".one{background-color:"#fff"}\n"
```

```js
// build.js
import esbuild from "esbuild";
import rawCssPlugin from "esbuild-plugin-raw-css";

esbuild.build({
  entryPoints: ["index.js"],
  bundle: true,
  outfile: "out.js",
  plugins: [
    rawCssPlugin({
      // optional
      minify: false,
    }),
  ],
});
```

## With typescript

Add type declaration for `*.css?raw` in your project.

```ts
declare module "*.css?raw" {
  const src: string;
  export default src;
}
```

## API Reference

```ts
type RawCssPluginOptions = {
  /** if minify css text @default true */
  minify?: boolean;
};
```
