# version-file-webpack-plugin

Generate version infomation file in webpack output folder

[![test](https://github.com/wangcch/version-file-webpack-plugin/actions/workflows/main.yml/badge.svg)](https://github.com/wangcch/version-file-webpack-plugin/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/version-file-webpack-plugin.svg)](https://www.npmjs.com/package/version-file-webpack-plugin)
[![](https://img.shields.io/github/license/wangcch/version-file-webpack-plugin)](https://github.com/wangcch/version-file-webpack-plugin/blob/main/LICENSE)

## usage

```
# install dependencies
yarn

# build for production with minification
yarn build

# test
yarn test
```

## options

| options                | type           | default                            | description                                                                                                                |
| ---------------------- | -------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| output                 | string         | \_\_version.json                   | file path                                                                                                                  |
| data                   | object         | `{}`                               | output data                                                                                                                |
| jsonStringify.replacer | array          | null                               | JSON.stringify [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) |
| jsonStringify.space    | string\|number | 2                                  | JSON.stringify [space](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)    |
| writeFileOptions       | object         | `{ encoding: "utf-8", flag: "w" }` | fs.writeFile options                                                                                                       |

## config

```js
// webpack.config.js

const VersionPlugin = require('version-file-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new VersionPlugin({
      output: '__info/version.txt',
      data: process.env,
    });
  ],
};
```

## license

[MIT](./LICENSE)
