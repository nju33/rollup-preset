const fs = require('fs');
const rollup = require('rollup');
const preset = require('..').default;

const config = {
  entry: `${__dirname}/index.js`,
  plugins: preset({
    base: 'test'
  }),
  cache: null
};

rollup.rollup(config).then(bundle => {
  const result = bundle.generate({
    format: 'iife',
    moduleName: 'example',
    banner: '// FOO'
  });
  config.cache = bundle;
  fs.writeFileSync(`${__dirname}/result.js`, result.code);
}).catch(err => console.log(err));
