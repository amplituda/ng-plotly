const path = require('path');
const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const wcc = require('./webpack.config.common');

const root = (__path = '.') => path.join(__dirname, __path);

let config = wcc({
  target: process.env.TARGET,
  appFolder: root('demo'),
  srcFolders: [root('src')],
  outputFolder: root('demo_dist')
});

module.exports = merge(config, {
  resolve: {
    alias: {
      'plotly.js': path.resolve(__dirname, 'node_modules/plotly.js/dist/plotly.js'), // Plotly.js fix
      // 'loglevelnext': path.resolve(__dirname, 'node_modules/loglevelnext/dist/loglevelnext.js')
    },
  }
});

if (process.env.WEBPACK_SERVE) {
  module.exports.serve = {
    port: 3000,
    add: (app, middleware, options) => app.use(convert(history()))
  };
}
