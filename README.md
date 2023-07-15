# esbuild-plugin-minify-html

esbuild plugin for importing html files as minified raw text.

It uses [html-minifier-terser](https://github.com/terser/html-minifier-terser) to minify the html.

## Usage

```js
// index.js
import appHTML from "./app.html?raw";
console.log(appHTML);
```

```js
// build.js
import esbuild from "esbuild";
import minifyHTML from "esbuild-plugin-minify-html";

esbuild.build({
  entryPoints: ["index.js"],
  bundle: true,
  outfile: "out.js",
  plugins: [
    minifyHTML({
      // optional html-minifier-terser options
      collapseWhitespace: true,
    }),
  ],
});
```

## With typescript

Add type declaration for `*.html?raw` in your project.

```ts
declare module "*.html?raw" {
  const src: string;
  export default src;
}
```

## Credit

This is a fork of [esbuild-plugin-raw-css](https://github.com/Debonex/esbuild-plugin-raw-css).
