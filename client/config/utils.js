const path = require('path');

exports.PROJECT_ROOT = (...args) => path.resolve(__dirname, '../', ...args);

exports.SRC = (...args) => exports.PROJECT_ROOT('src', ...args);

exports.DIST = (...args) => exports.PROJECT_ROOT('dist', ...args);

exports.NODE_MODULES = (...args) => exports.PROJECT_ROOT('../node_modules', ...args);

exports.LOADERS = (...args) => exports.PROJECT_ROOT('config/loaders', ...args);

exports.isProd = /^prod(?:uction)?$/.test(process.env.NODE_ENV || '');