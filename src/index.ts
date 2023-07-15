import type { Plugin } from "esbuild";
import type { Options } from "html-minifier-terser";
import { minify } from "html-minifier-terser";
import { readFile } from "fs/promises";
import path from "path";

export type MinifyHTMLOptions = Options;

const pluginNamespace = "minified-html-loader";
const minifyHtmlPlugin = (options?: Options): Plugin => {
  return {
    name: "minified-html",
    setup: (build) => {
      build.onResolve({ filter: /\.htm(?:l)?\?raw$/ }, (args) => {
        return {
          namespace: pluginNamespace,
          path: args.path,
          pluginData: {
            resolveDir: args.resolveDir,
          },
        };
      });

      build.onLoad(
        { filter: /\.htm(?:l)?\?raw$/, namespace: pluginNamespace },
        async (args) => {
          const fullPath = path.isAbsolute(args.path)
            ? args.path
            : path.resolve(args.pluginData.resolveDir, args.path);
          const rawText = await readFile(fullPath.replace(/\?raw$/, ""), {
            encoding: "utf8",
          });
          const contents = await minify(rawText, options);
          return {
            contents,
            loader: "text",
          };
        }
      );
    },
  };
};

export default minifyHtmlPlugin;
