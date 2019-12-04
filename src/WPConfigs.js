import path from 'path';

import { readSync as loadYaml } from 'node-yaml';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as utils from './utils.js';


const { logger: console } = utils;


const CUSTOM_FILENAME = '.xrosyrc';


export default function BuiltIn({ workspace = '.' }) {
  const absWorkspace = path.resolve(workspace);
  const { apps, ...userConfigs } = loadYaml(path.join(absWorkspace, CUSTOM_FILENAME));

  class WPConfig {

    bail = true;

    mode = 'production'; // "development" | "production" | "none"

    target = 'web';

    devtool = 'cheap-module-eval-source-map';

    resolve = {
      mainFiles : [ 'index', 'main' ],
      extensions: [ '.js', '.jsx', '.json' ],
      modules   : [ path.resolve(absWorkspace, 'src/libs'), 'node_modules' ],
      alias     : {
        '@utils': path.join(absWorkspace, 'src/utils'),
        '@env'  : path.join(absWorkspace, 'src/env'),
      },
    };

    module = {
      rules : [
        {
          test: /\.jsx?$/,
          use : {
            loader : 'babel-loader',
            options: {
              presets : [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins : [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime'
              ],
            },
          },
          include : path.join(absWorkspace, 'src'),
          // exclude : /(node_modules|bower_components)/,
        },

        {
          test: /\.s?css$/,
          use : [{
            loader : MiniCssExtractPlugin.loader, options: { reloadAll: true },
          }, {
            loader : 'css-loader', options: { importLoaders: 1 },
          }, {
            loader : 'sass-loader', options: {},
          }],
        },

        {
          test: /\.less$/,
          use : [{
            loader : MiniCssExtractPlugin.loader, options: { reloadAll: true },
          }, {
            loader : 'css-loader', options: { importLoaders: 1 },
          }, {
            loader : 'less-loader',
          }],
        },
      ],
    };

    optimization = {
      minimize         : true,
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
        filename : 'static/styles/[name].[hash:6].css',
      }),

      // new I18nPlugin(languageConfig, optionsObj),

      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks : 5,
      }),

      // new webpack.optimize.OccurrenceOrderPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
    ];


    context = (function() {
      return absWorkspace;
    }())

    entry = {};

    output = (function() {
      let userOutput = userConfigs.output || { path: 'dist' };

      if (typeof userOutput === 'string') {
        userOutput = { path: userOutput };
      }

      return {
        hashSalt     : 'Oulate X',
        ...userOutput,
        path         : path.join(absWorkspace, userOutput.path),
        filename     : 'static/js/[name].[chunkhash:6].js',
        chunkFilename: 'static/js/[name].[chunkhash:6].js',
      };
    }());

    constructor() {
      this.optimization.noEmitOnErrors = true;

      this.initEntries();
    }

    initEntries() {
      const userApps = apps;

      Object.keys(userApps).forEach((name) => {
        const basic = path.join(absWorkspace, 'src', 'apps', userApps[name]);
        this.entry[name] = path.join(basic, 'main.js');

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


  return webpack(new WPConfig());
}
