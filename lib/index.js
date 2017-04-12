import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import vue from 'rollup-plugin-vue';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import babili from 'rollup-plugin-babili';
import compact from 'lodash.compact';

let hasBabelPresetFlow = false;
try {
  require.resolve('babel-preset-flow');
  hasBabelPresetFlow = true;
} catch (err) {}

const defaultOpts = {
  base: 'lib',
  env: process.env.NODE_ENV || 'development',
  vue: false,
  babel: {
    presets: compact([
      ['env', {
        targets: {browsers: ['> 3%', 'last 2 versions']},
        modules: false
      }],
      (hasBabelPresetFlow ? 'flow' : null)
    ]),
    plugins: [
      'transform-runtime',
      'external-helpers',
      'transform-decorators-legacy',
      'transform-object-rest-spread',
      'transform-class-properties'
    ]
  },
  minify: false
};

export default function preset(opts = defaultOpts) {
  opts = Object.assign({}, defaultOpts, opts);

  if (typeof opts.base !== 'string') {
    throw new TypeError('`options.base` expected to string');
  }

  return compact([
    replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }),
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    json({
      include: `${opts.base}/**/*.json`
    }),
    typeof opts.vue === 'object' ? vue(opts.vue) : null,
    svelte({
      include: `${opts.base}/**/*.html`
    }),
    babel({
      include: `${opts.base}/**/*+(js|html)`,
      runtimeHelpers: true,
      babelrc: false,
      ...opts.babel
    }),
    opts.minify ? babili({comments: false}) : null
  ]);
}
