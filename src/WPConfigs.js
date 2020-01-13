import path from 'path';

import { readSync as ymal } from 'node-yaml';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';


import * as utils from './utils';

import {
  CONST_DEVELOPMENT,
  CONST_PRODUCTION,
  CONST_BUILT_DIRECTORY,
  CONST_WEBPACK_HOT,
  BROWSERS
} from './constant';


const console = utils.logger;


function $GetHtmlWebpackPlugin() {
  return new HtmlWebpackPlugin({
    chunks            : [ 'runtime', 'framework.depend', 'framework.commons', 'main' ],
    template          : path.join(__dirname, '../view.art'),
    // eslint-disable-next-line babel/camelcase
    templateParameters: { compile_date: (new Date()).toLocaleString('zh', { hour12: false }) },
    filename          : 'index.html',
    hash              : false,
    meta              : {
      viewport : 'width=device-width, initial-scale=1, user-scalable=no',
    },
    minify : {
      collapseWhitespace           : true,
      removeComments               : false,
      removeRedundantAttributes    : true,
      removeScriptTypeAttributes   : true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype              : true,
    },
  });
}

function $GetProductDirectory(pd) {
  return path.resolve(pd);
}

function $GetProfileContent(context) {
  const profilePath = path.join(context, '.xrosyrc');

  let profile = {};

  if (utils.exists(profilePath)) {
    profile = ymal(profilePath) || {};
  }

  return { ...profile };
}

function $GetModuleRules(mode) {
  const MiniCssExtractPluginLoader = {
    loader : MiniCssExtractPlugin.loader,
    options: {
      reloadAll : false,
      publicPath: '../',
      hmr       : mode === CONST_DEVELOPMENT,
    },
  };

  const $StyleRules = [
    MiniCssExtractPluginLoader,
    {
      loader : 'css-loader',
      options: { importLoaders: 1 },
    }
  ];

  return [
    {
      test: /\.jsx?$/,
      use : {
        loader : 'babel-loader',
        options: {
          cacheDirectory: true,
          presets       : [
            [ '@babel/preset-env', {
            /* 将此参数设置为false,既将module交由webpack处理，而不是babel */
              modules    : 'auto', // 'commonjs', 'amd', 'umd', 'systemjs', 'auto'
              useBuiltIns: 'usage',
              corejs     : '3.4.7',
              // shippedProposals: true,
              targets    : {
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
      // include : path.join(absWorkspace, 'src'),
      exclude : /(node_modules|bower_components)/,
    },

    {
      test: /\.(jpg|png|gif|bmp|jpeg|svg)$/,
      use : [
        {
          loader : 'url-loader',
          options: {
            esModule  : false,
            limit     : 8192,
            publicPath: '../',
            outputPath: 'images',
            name      : '[hash:16].[ext]',
          },
        },
        // {
        //   loader : 'image-webpack-loader',
        //   options: {
        //     bypassOnDebug : true,
        //   },
        // }
      ],
    },


    {
      test: /\.s?css$/,
      use : [ ...$StyleRules, { loader: 'sass-loader' }],
    },

    {
      test: /\.less$/,
      use : [ ...$StyleRules, { loader: 'less-loader' }],
    }
  ];
}

function $GetWebpackMode(mode) {
  return mode === 'dev' ? CONST_DEVELOPMENT : CONST_PRODUCTION;
}

function $GetOutput({
  built = CONST_BUILT_DIRECTORY,
  publicPath = '/',
  hashSalt = 'Oulate-X',
  context,
} = {}) {
  return {
    hashSalt,
    publicPath,
    path         : path.resolve(context, built),
    filename     : 'js/[name].js',
    chunkFilename: 'js/[name].js',
  };
}

function $GetPluginsList({ apps, mode, env, output, ...argv }) {
  const isProduction = mode === CONST_PRODUCTION;

  return (
    []
      .concat(
        isProduction
          ? [ new CleanWebpackPlugin({ cleanStaleWebpackAssets: true, cleanOnceBeforeBuildPatterns: [ output.path ]}) ]
          : []
      )
      .concat([
        new webpack.DefinePlugin({
          env : JSON.stringify(env),
        }),

        // new I18nPlugin(languageConfig, optionsObj),

        new MiniCssExtractPlugin({
          filename : 'styles/[name].css',
        }),

        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks : 5,
        }),

        $GetHtmlWebpackPlugin({ apps, mode, env, output, ...argv }),
      ])
      .concat(
        isProduction
          ? []
          : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
          ]
      )
  );
}

function $GetEntries({ apps, context, mode }) {
  // console.log(apps, context, mode);
  const entryFile = path.join(context, apps[0], 'index.jsx');


  return {
    main : mode === CONST_DEVELOPMENT ? [ CONST_WEBPACK_HOT, entryFile ] : entryFile,
  };
}

function $GetOtimization(mode) {
  return {
    minimize         : true,
    namedChunks      : true,
    runtimeChunk     : 'single', // 'multiple'
    removeEmptyChunks: true,
    noEmitOnErrors   : true,
    splitChunks      : {
      // 静态资源缓存
      // test, priority and reuseExistingChunk can only be configured on cache group level.
      cacheGroups : {
        // 提取 node_modules 里面依赖的代码
        'framework.depend' : {
          name              : 'framework.depend',
          filename          : `js/[name]${mode === CONST_DEVELOPMENT ? '' : '.[contenthash:8]'}.js`,
          test              : /[\\/]node_modules[\\/]/,
          chunks            : 'all',
          minChunks         : 1, // 2个共享以及以上都提取
          minSize           : 0,
          priority          : -10, // 优先级
          reuseExistingChunk: true,
          enforce           : true,
        },

        // 提出每个模块公共的代码
        'framework.commons' : {
          name              : 'framework.commons',
          filename          : `js/[name]${mode === CONST_DEVELOPMENT ? '' : '.[contenthash:8]'}.js`,
          test              : /\.js$/,
          chunks            : 'initial',
          minChunks         : 1, // 两个共享以及以上都提取,
          minSize           : 0,
          priority          : -20, // 优先级
          reuseExistingChunk: true,
          enforce           : true,
        },

        // 'css' : {
        //   name              : 'styles',
        //   // filename          : '',
        //   test              : /\.css$/,
        //   chunks            : 'initial',
        //   minChunks         : 1,
        //   minSize           : 0,
        //   priority          : -20,
        //   // chunks            : 'all',
        //   reuseExistingChunk: true,
        //   enforce           : true,
        // },
      },
    },
  };
}

/* ========================================================================== */


export default ({
  env,
  mode: modex,
  productDirectory,
}) => {
  const context = $GetProductDirectory(productDirectory);

  const mode = $GetWebpackMode(modex);

  const profile = { ...$GetProfileContent(context), context, mode, env };

  const output = $GetOutput({ ...profile });

  const entry = $GetEntries({ ...profile });

  const plugins = $GetPluginsList({ ...profile, output });

  const module = {};
  module.rules = $GetModuleRules(mode);

  const optimization = $GetOtimization(mode);

  const resolve = {
    mainFiles : [ 'index', 'main' ],
    extensions: [ '.jsx', '.js', '.json' ],
    modules   : [ path.join(context, 'src/library'), 'node_modules' ],
    alias     : {
      'src'   : path.join(context, 'src'),
      '@env'  : path.join(context, 'src/env'),
      '@utils': path.join(context, 'src/utils'),

      ...profile.alias,
    },
  };

  return {
    mode,
    context,
    entry,
    output,
    resolve,
    module,
    optimization,
    plugins,
    // performance: {},
    target : 'web',
    bail   : false,
    devtool: mode === CONST_DEVELOPMENT ? 'cheap-module-eval-source-map' : 'none',
  };
};
