const path = require('path');
const webpack = require('webpack');
const { ProgressPlugin, ContextReplacementPlugin } = require('webpack');

const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssImport = require('postcss-import');
const postcssNesting = require('postcss-nesting');
const postcssCssVariables = require('postcss-css-variables');
const postcssColorFunction = require('postcss-color-function');
const postcssNext = require('postcss-cssnext');
const rucksackCss = require('rucksack-css');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const POST_CSS_PLUGINS_COMMON = [
  postcssImport(),
  postcssNesting(),
  postcssCssVariables(),
  postcssColorFunction(),
  postcssNext(),
  rucksackCss(),
];

const POST_CSS_PLUGINS_CSSNANO = [
  ...POST_CSS_PLUGINS_COMMON,
  cssnano({
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: {
      remove: (comment) => !(/@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i.test(comment))
    }
  })
];

const CSS_LOADER_ALIAS = {
  '../fonts': '../assets/fonts',
  '../imgs': '../assets/imgs'
};

module.exports = function wcc({ target, appFolder, outputFolder, srcFolders, publicPath = '' }) {

  let mode;
  let devtool;
  let minify;
  let tsLoader;
  let replaceEnvFile;
  let extractCSS;
  let htmlPlugin;
  let copyAssetsPlugin;
  let entry;
  let output;

  if (target === 'development') {
    mode = 'development';
    devtool = undefined;
    minify = false;
    tsLoader = 'ngtools';
    replaceEnvFile = false;
    htmlPlugin = true;
    copyAssetsPlugin = true;
    entry = {
      main: path.join(appFolder, 'main.ts'),
      polyfills: path.join(appFolder, 'polyfills.ts'),
      styles: path.join(appFolder, 'styles/index.styl')
    };
    output = {
      path: outputFolder,
      publicPath,
      filename: '[name].js',
      chunkFilename: '[name].[hash].chunk.js',
    };
  } else if (target === 'production') {
    mode = 'production';
    devtool = 'cheap-eval-source-map';    
    minify = true;
    tsLoader = 'ngtools';
    replaceEnvFile = 'prod';
    extractCSS = true;
    htmlPlugin = true;
    copyAssetsPlugin = true;
    entry = {
      main: appFolder + '/main.ts',
      polyfills: appFolder + '/polyfills.ts',
      styles: appFolder + '/styles/index.styl'
    };
    output = {
      path: outputFolder,
      publicPath,
      filename: '[name].js',
      chunkFilename: '[name].[hash].chunk.js',
    };
  } else if (target === 'testing') {
    mode = 'none';
    devtool = 'cheap-eval-source-map';    
    minify = false;
    tsLoader = 'atl';
    replaceEnvFile = false;
    extractCSS = false;
    htmlPlugin = false;
    copyAssetsPlugin = false;
    entry = undefined;
    output = undefined;
  } else {
    throw 'INVALID_TARGET';
  }

  srcFolders = srcFolders || [];

  const POSTCSS_PLUGINS = minify ? POST_CSS_PLUGINS_CSSNANO : POST_CSS_PLUGINS_COMMON;

  const RULES = [];
  const PLUGINS = [];

  if (tsLoader === 'ngtools') {
    RULES.push({
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: [
        {
          loader: '@angular-devkit/build-optimizer/webpack-loader',
          options: {
            sourceMap: false
          }
        },
        {
          loader: '@ngtools/webpack'
        }
      ]
    });

    PLUGINS.push(
      new AngularCompilerPlugin({
        tsConfigPath: 'tsconfig.json',
        entryModule: path.join(appFolder, '/src/app.module#AppModule'),
        skipCodeGeneration: false,
        hostReplacementPaths: replaceEnvFile ? {
          [path.join(appFolder, '/environment/environment.ts')]: path.join(appFolder, `/environment/environment.${replaceEnvFile}.ts`)
        } : {},
      }),
      new PurifyPlugin()
    );
  }

  if (tsLoader === 'atl') {
    RULES.push({
      test: /\.ts?$/,
      use: [
        'awesome-typescript-loader',
        'angular2-template-loader'
      ]
    });
    PLUGINS.push(
      new CheckerPlugin(),
      new ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, appFolder, {})
    );
  }

  return {
    mode,
    entry,
    output,
    resolve: {
      extensions: [".ts", ".js", ".json", ".css", ".styl", ".html"],
    },
    module: {
      rules: [
        ...RULES,
        // The component styl files are stringified to work with the ngc loader
        {
          test: /\.styl$/,
          include: [path.join(appFolder, 'src'), ...srcFolders],
          use: [
            'to-string-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                parser: 'sugarss',
                plugins: POSTCSS_PLUGINS,
                sourceMap: false
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: [path.join(appFolder, 'src'), ...srcFolders],
          use: [
            'to-string-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1,
              }
            }
          ]
        },
        {
          include: [path.join(appFolder, 'src'), ...srcFolders],
          test: /\.(html)$/,
          use: ['raw-loader'],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },
        {
          test: /\.styl$/,
          include: [path.join(appFolder, 'styles')],
          use: [
            extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  alias: CSS_LOADER_ALIAS,
                  minimize: minify
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  parser: 'sugarss',
                  plugins: POSTCSS_PLUGINS,
                  sourceMap: false
                }
              }
            ]
        },
        // TODO: Remove - Ignores System.import warning in angular module
        { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
      ]
    },
    plugins: [
      ...PLUGINS,
      new MiniCssExtractPlugin(),
      ...(copyAssetsPlugin ? [new CopyWebpackPlugin([{
        from: path.join(appFolder, 'assets/public'),
        to: ''
      }])] : []),
      new ProgressPlugin(),
      new CircularDependencyPlugin({
        exclude: /(\\|\/)node_modules(\\|\/)/,
        failOnError: false
      }),
      ...(htmlPlugin ? [new HtmlWebpackPlugin({
        template: path.join(appFolder, 'index.html'),
        minify: minify ? {
          caseSensitive: true,
          collapseWhitespace: true,
          keepClosingSlash: true
        } : false,
        chunksSortMode: (left, right) => {
          const entryPoints = ['polyfills', 'styles', 'main'];
          const leftIndex = entryPoints.indexOf(left.names[0]);
          const rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          } else if (leftIndex < rightindex) {
            return -1;
          } else {
            return 0;
          }
        },
      })] : []),
    ]
  };
}
