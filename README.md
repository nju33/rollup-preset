# Rollup preset

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Preset for nju33.

## Install

```bash
yarn add -D @nju33/rollup-preset
```

```js
rollup.rollup({
  plugins: [...preset({...options}), ...]
})
```

## Plugins

```js
"dependencies": {
  "rollup-plugin-babel": "^2.7.1",
  "rollup-plugin-babili": "^2.0.0",
  "rollup-plugin-commonjs": "^8.0.2",
  "rollup-plugin-json": "^2.1.0",
  "rollup-plugin-node-resolve": "^3.0.0",
  "rollup-plugin-replace": "^1.1.1",
  "rollup-plugin-svelte": "^1.6.1",
  "rollup-plugin-vue": "^2.3.1"
}
```

## Options

```js
const default = {
  // Name of the root directory where the script is placed
  base: 'lib',
  // Values that can be referenced in `process.env.NODE_ENV`
  env: process.env.NODE_ENV || 'development',
  // Setting up rollupPluginVue
  // VuePlugin is enabled with at least the empty object
  vue: false, // or {...}
  // Babel setting for rollup
  babel: {
    /*
      yarn add -D babel-preset-env \
                  babel-plugin-transform-runtime \
                  babel-plugin-external-helpers \
                  babel-plugin-transform-decorators-legacy \
                  babel-plugin-transform-object-rest-spread \
                  babel-plugin-transform-class-properties

      if you wanna use flow syntax, execute below
        yarn add -D babel-preset-flow

    */
    presets: [
      ['env', {
        targets: {browsers: ['> 3%', 'last 2 versions']},
        modules: false
      }]
    ],
    plugins: [
      'transform-runtime',
      'external-helpers',
      'transform-decorators-legacy',
      'transform-object-rest-spread',
      'transform-class-properties',
      // ...
    ]
  },
  // Whether to minify with babili
  minify: false
}
```

## Lisence

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
