import path from 'path';

import { readSync as loadYaml } from 'node-yaml';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import * as utils from './utils.js';
import WPServer from './WPServer.js';
import {
  MODE_DEVELOPMENT,
  MODE_PRODUCTION
} from './constant';


const { logger: console } = utils;

const CUSTOM_FILENAME = '.xrosyrc';
const BROWSERS = [
  'last 3 versions',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 12.1',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
  'and_uc 9.9'
];

export default function BuiltIn({ mode, workspace = '.' }) {
  const absWorkspace = path.resolve(workspace);
  const { apps, ...userConfigs } = loadYaml(path.join(absWorkspace, CUSTOM_FILENAME));

  const builtMode = mode === 'dev' ? MODE_DEVELOPMENT : MODE_PRODUCTION;
  const MiniCssExtractPluginLoader = {
    loader : MiniCssExtractPlugin.loader,
    options: {
      reloadAll : false,
      publicPath: '../',
      hmr       : builtMode === MODE_DEVELOPMENT,
    },
  };


  class WPConfig {

    entry = {};

    bail = true;

    context = (function() {
      return absWorkspace;
    }())

    // mode = 'development'; // "development" | "production" | "none"
    mode = builtMode

    target = 'web';

    devtool = 'cheap-module-eval-source-map';

    resolve = {
      mainFiles : [ 'index', 'main' ],
      extensions: [ '.jsx', '.js', '.json' ],
      modules   : [ path.resolve(absWorkspace, 'src/library'), 'node_modules' ],
      alias     : {
        '@utils': path.join(absWorkspace, 'src/utils'),
        '@env'  : path.join(absWorkspace, 'src/env'),
      },
    };

    module = {
      rules : [{
        test: /\.jsx?$/,
        use : {
          loader : 'babel-loader',
          options: {
            cacheDirectory: true,
            presets       : [
              [ '@babel/preset-env', {
                /* 将此参数设置为false,既将module交由webpack处理，而不是babel */
                modules: false, // 'commonjs', 'amd', 'umd', 'systemjs', 'auto'
                // useBuiltIns     : 'usage',
                // corejs          : '3.4.7',
                // shippedProposals: true,
                targets: {
                  browsers : BROWSERS,
                },
              }],
              [ '@babel/preset-react', {
              }]
            ],
            plugins : [
              '@babel/plugin-proposal-class-properties',
              [ '@babel/plugin-transform-runtime', { corejs: 3, helpers: true }]
            ],
          },
        },
        include : path.join(absWorkspace, 'src'),
        // exclude : /(node_modules|bower_components)/,
      },

      {
        test: /\.s?css$/,
        use : [ MiniCssExtractPluginLoader, {
          loader : 'css-loader', options: { importLoaders: 1 },
        }, {
          loader : 'sass-loader', options: {},
        }],
      },

      {
        test: /\.less$/,
        use : [ MiniCssExtractPluginLoader, {
          loader : 'css-loader', options: { importLoaders: 1 },
        }, {
          loader : 'less-loader',
        }],
      },

      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use : [{
          loader : 'url-loader',
          options: {
            esModule  : false,
            limit     : 8192,
            publicPath: '../',
            name      : 'images/[hash:16].[ext]',
          },
        }],
      }],
    };

    performance = (() => {
      if (this !== 1112) return false;

      return { hints: 'warning' };
    })();

    optimization = {
      minimize         : false,
      namedChunks      : true,
      runtimeChunk     : 'single', // 'multiple'
      removeEmptyChunks: true,
      splitChunks      : {
        // 静态资源缓存
        // test, priority and reuseExistingChunk can only be configured on cache group level.
        cacheGroups : {
          // 提取 node_modules 里面依赖的代码
          'framework.depend' : {
            name     : 'framework.depend',
            // filename : 'framework/[name].[contenthash:6].js',
            test     : /[\\/]node_modules[\\/]/,
            chunks   : 'all',
            minChunks: 2, // 2个共享以及以上都提取
            minSize  : 0,
            priority : -10, // 优先级
          },

          // 提出每个模块公共的代码
          'framework.commons' : {
            name              : 'framework.commons',
            // filename          : 'framework/[name].[contenthash:6].js',
            enforce           : true,
            test              : /\.js$/,
            chunks            : 'initial',
            minChunks         : 2, // 两个共享以及以上都提取,
            minSize           : 0,
            priority          : -20, // 优先级
            reuseExistingChunk: true,
            enforce           : true,
          },

          // css : {
          //   name              : 'styles',
          //   test              : /\.css$/,
          //   minChunks         : 1,
          //   minSize           : 0,
          //   priority          : -20,
          //   // chunks            : 'initial',
          //   chunks            : 'all',
          //   reuseExistingChunk: true,
          //   enforce           : true,
          // },
        },
      },
    };

    plugins = [
      new webpack.DefinePlugin({
        'env'                 : JSON.stringify('dev'),
        'service.env'         : JSON.stringify('dev'),
        'process.env.NODE_ENV': JSON.stringify('dev'),
      }),

      new MiniCssExtractPlugin({
        filename : 'styles/[name].css',
      }),

      // new I18nPlugin(languageConfig, optionsObj),

      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks : 5,
      }),
    ];

    output = (function() {
      let userOutput = userConfigs.output || { path: 'dist' };

      if (typeof userOutput === 'string') {
        userOutput = { path: userOutput };
      }

      return {
        hashSalt     : 'Oulate X',
        publicPath   : '',
        ...userOutput,
        // path         : builtMode === MODE_DEVELOPMENT ? '/var/tmp/@xrosy/generator' : path.join(absWorkspace, userOutput.path),
        path         : path.join(absWorkspace, userOutput.path),
        filename     : 'js/[name].js',
        chunkFilename: 'js/[name].js',
      };
    }());

    constructor() {
      this.optimization.noEmitOnErrors = true;

      this.initEntries();

      if (builtMode === MODE_DEVELOPMENT) {
        this.plugins.unshift(new CleanWebpackPlugin({
          cleanStaleWebpackAssets     : true,
          cleanOnceBeforeBuildPatterns: [ this.output.path ],
        }));

        this.plugins.push(
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
        );
      }
    }


    initEntries() {
      const userApps = apps;
      const isDevelopment = builtMode === MODE_DEVELOPMENT;

      Object.keys(userApps).forEach((name) => {
        const basic = path.join(absWorkspace, 'src', 'apps', userApps[name]);
        const etr = path.join(basic, 'main.js');

        this.entry[name] = isDevelopment ? [ 'webpack-hot-middleware/client?noInfo=true&reload=true', etr ] : etr;

        this.plugins = this.plugins || [];

        this.plugins.push(
          new HtmlWebpackPlugin({
            chunks            : [ 'runtime', 'framework.depend', 'framework.commons', name ],
            template          : path.join(basic, 'main.html'),
            filename          : `${name}.html`,
            hash              : false,
            // eslint-disable-next-line babel/camelcase
            templateParameters: { compile_date: (new Date()).toLocaleString('zh', { hour12: false }) },
            minify            : {
              collapseWhitespace           : true,
              removeComments               : false,
              removeRedundantAttributes    : true,
              removeScriptTypeAttributes   : true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype              : true,
            },
          })
        );
      });
    }

  }

  const wpCompiler = webpack(new WPConfig());

  // develop service
  if (builtMode === MODE_DEVELOPMENT) {
    return WPServer(wpCompiler);
  }

  // build
  wpCompiler.run((err, stats) => {
    // console.log(stats.toJson());
    const { errors } = stats.toJson();
    // console.warn(errors.toString());
    console.primary('耗时:', (+stats.endTime - +stats.startTime) / 1000, '秒');
    // console.error(stats.endTime);
    // cat.error(Object.keys(stats.compilation));
  });
}
