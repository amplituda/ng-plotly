// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const WPC = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    files: [
      { pattern: 'src/test.js', watched: true }
    ],
    exclude: [ ],
    preprocessors: {
      'src/test.js': ['webpack']
    },
    reporters: ['progress', 'kjhtml'],
    webpack: WPC,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
