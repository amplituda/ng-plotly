const path = require('path');
const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const wcc = require('./webpack.config.common');

const root = (__path = '.') => path.join(__dirname, __path);

module.exports = wcc({
  target: process.env.TARGET, 
  appFolder: root('demo'),
  sourceFolders: [root('src')],
  outputFolder: root('demo_dist')
});

if (process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    port: 3000,
    add: (app, middleware, options) => app.use(convert(history()))
  };
}
