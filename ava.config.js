export default {
  babel: {
    compileEnhancements: false,
  },
  require: ["ts-node/register"],
  typescript: {
    extensions: ["ts"],
    rewritePaths: {
      "src/": "build/",
    },
  },
};
