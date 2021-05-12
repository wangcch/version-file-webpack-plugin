import fs from "fs";
import path from "path";
import { Compiler } from "webpack";

export type VersionPluginOptions = {
  /**
   * output path
   * @default __version.json
   */
  output: string;
  /** Absolute path of output */
  absolute?: boolean;
  data?: Record<string | number, any>;
  jsonStringify?: {
    replacer?: (number | string)[];
    space?: number | string;
  };
  writeFileOptions?: fs.BaseEncodingOptions & { mode?: fs.Mode };
};

const NextJModePathRegExp = /.next(\/server)?$/;

const defaultOptions: VersionPluginOptions = {
  output: "__version.json",
  data: {},
};

export default class VersionPlugin {
  options: VersionPluginOptions;
  private outputPath: string;

  constructor(options: Partial<VersionPluginOptions> = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.outputPath = "./";
  }

  apply(compiler: Compiler): void {
    if (compiler.options.output?.path) {
      // support nextjs
      if (NextJModePathRegExp.test(compiler.options.output.path)) {
        this.outputPath = path.resolve(__dirname, "public");
      } else {
        this.outputPath = compiler.options.output.path;
      }
    }

    const filePath = this.options.absolute
      ? this.options.output
      : path.join(this.outputPath, this.options.output);

    writeFile(
      filePath,
      JSON.stringify(
        this.options.data,
        this.options.jsonStringify?.replacer || null,
        this.options.jsonStringify?.space || 2
      ),
      this.options.writeFileOptions
    );
  }
}

function writeFile(
  filePath: string,
  content: string,
  options?: fs.BaseEncodingOptions & { mode?: fs.Mode }
) {
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFile(
    filePath,
    content,
    Object.assign({}, { encoding: "utf-8", flag: "w" }, options),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
}

module.exports = VersionPlugin;
