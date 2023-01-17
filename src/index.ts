import type { Plugin } from "esbuild";
import { transform } from "esbuild";
import { readFile } from "fs/promises";
import path from "path";

const pluginNamespace = "raw-css-loader";

type RawCssPluginOptions = {
  /** if minify css text @default true */
  minify?: boolean;
};

const rawCssPlugin = (options?: RawCssPluginOptions): Plugin => {
  return {
    name: "raw-css",
    setup: (build) => {
      build.onResolve({ filter: /\.css\?raw$/ }, (args) => {
        return {
          namespace: pluginNamespace,
          path: args.path,
          pluginData: {
            resolveDir: args.resolveDir,
          },
        };
      });

      build.onLoad(
        { filter: /\.css\?raw$/, namespace: pluginNamespace },
        async (args) => {
          const fullPath = path.isAbsolute(args.path)
            ? args.path
            : path.resolve(args.pluginData.resolveDir, args.path);

          const rawText = await readFile(fullPath.replace(/\?raw$/, ""));
          const minify = options?.minify ?? true;
          let contents: string;
          if (minify) {
            contents = (
              await transform(rawText, {
                loader: "css",
                minify: true,
              })
            ).code;
          } else {
            contents = rawText.toString();
          }
          return {
            contents: contents,
            loader: "text",
          };
        }
      );
    },
  };
};

export default rawCssPlugin;
