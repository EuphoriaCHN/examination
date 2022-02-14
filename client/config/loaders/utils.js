const { parseSync } = require('@babel/core');

exports.parseFile = function (code) {
  return parseSync(code, {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
    filename: 'file.tsx'
  });
}
