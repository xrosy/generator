/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }]*/

import util from 'util';
import path from 'path';
import fs from 'fs';

import yaml from 'node-yaml';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { CONST_ENTRY_MAIN, DEFAULT_SERVICE_PORT, DEFAULT_DIST_PATH } from './WPConst.js';
import devServer from './server.js';

const SYM_ARGS = Symbol.for('argv');
const SYM_PROFILE_CONFIGS = Symbol.for('profileConfigs');
const SYM_HTML_WEBPACK_PLUGIN = Symbol.for('HtmlWebpackPlugin');
const _PROFILE_SUPPORTED_LIST = [ '.xrosyrc', '.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc.json' ];

function logger (target, key, descriptor) {
  console.log('descriptor:', descriptor);

  return descriptor;
}

function __setAttrPrivatization(obj, name) {
  Object.defineProperty(obj || {}, name, { writable: true, enumerable: false });
}

/** 验证文件或者目录是否存在
 *
 * @param   {string}      strPath             - the absolute path for file or directory.
 * @return  {boolean}                         - the validate result.
 */
function _exists(strPath) {
  return fs.existsSync(strPath);
}

/** 获取工程运行目录的绝对路径
 * @param   {string}      dirPath             - 项目相对运行位置的相对地址或者项目的绝对地址
 * @return  {string}                          - 工作目录的绝对
 */
const _getWorkspaceAbs = dirPath => {
  if (typeof dirPath !== 'string') {
    throw Error('The \'workspace\' must be a string.');
  }

  const workspace = path.resolve(dirPath);

  if (!_exists(workspace)) {
    throw Error('The workspace is not exist.');
  }

  return workspace;
};

/** 读取用的配置文件
 */
const _readConfigs = (profile, encoding = 'utf8') => {
  const profileName = (profile.split('/').pop() || '').toLowerCase();

  let profileConfigs = {};

  try {
    switch (profileName) {
      case '.xrosyrc.json':
        profileConfigs = require(profile);
        break;

      case '.xrosyrc.yaml':
      case '.xrosyrc.yml':
      case '.xrosyrc':
        profileConfigs = yaml.readSync(profile, { encoding });
        break;
    }
  }
  catch (e) {
    throw e;
  }

  return profileConfigs;
};


/** 配置类 */
export default class WPConfig {

  get webpackConfigs() {
    const output = this.getOutput();
    // const entry = this.getEntries();

    const webpackConfigs = {
      context: this.context,
      output,
      entry  : this.entry,
      resolve: this.resolve,

      mode   : 'none',
      devtool: 'eval-source-map',

      module : {
        rules : [
          {
            test: /\.(scss)$/,
            use : { loader: 'scss-loader' },
          },
          {
            test   : /\.(js|jsx)$/,
            use    : { loader: 'babel-loader', options: { presets: [ '@babel/preset-env', '@babel/preset-react' ]}},
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },

      optimization : { minimize: true },

      plugins : [
        /** 清除缓存 */
        new CleanWebpackPlugin({ dry: false, verbose: false }),
        /** 使用进度显示 */
        // new webpack.ProgressPlugin(),
        /** 在编译出现错误时，跳过输出阶段  */
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          chunks : [ 'library', 'utils', 'admin' ],
        }),
        new webpack.DefinePlugin({
          env : JSON.stringify(this.env),
        }),
      ],
    };

    return webpackConfigs;
  }

  set argv(value) {}

  get argv() {
    return this[SYM_ARGS];
  }

  get developer() {
    return this.argv.developer === true || false;
  }

  @logger
  get profileConfigs() {
    let _profileConfigs = this[SYM_PROFILE_CONFIGS];

    /* 判断是否已经读取过用户配置，是则返回缓存中的数据 */
    if (typeof _profileConfigs !== 'undefined') return _profileConfigs;

    /* 读取用户配置信息 */
    const _profileName = _PROFILE_SUPPORTED_LIST.find(itemString => {
      const absPath = path.resolve(this.context, itemString);

      return _exists(absPath);
    });

    if (_profileName) {
      _profileConfigs = _readConfigs(path.resolve(this.context, _profileName));
    }

    this[SYM_PROFILE_CONFIGS] = { ..._profileConfigs };

    return this[SYM_PROFILE_CONFIGS];
  }

  get serverPort() {
    return DEFAULT_SERVICE_PORT;
  }

  /* 初始化字段 */
  /* ------------------------------------ */
  /* 用户配置信息缓存字段 */
  [SYM_PROFILE_CONFIGS] = [];
  /*  */
  [SYM_HTML_WEBPACK_PLUGIN] = [];

  /* ------------------------------------ */
  constructor(argv = {}) {
    const _mergeOutput = () => {
      const { output = DEFAULT_DIST_PATH } = this.profileConfigs;
      const { path: outputPath = output } = output;

      return {
        filename  : 'static/[name.hash:6].js',
        path      : path.resolve(this.context, outputPath),
        publicPath: '',
        pathinfo  : false,
      };
    };

    const _mergeEntries = () => {
      const devMode = this.developer;
      const { services = {}} = this.profileConfigs;
      let _entries = {};

      if (!services || typeof services !== 'object' || Array.isArray(services)) {
        throw Error('services feild must be object.');
      }

      Object.keys(services).forEach(item => {
        let _ServicePortal = services[item];

        if (typeof _ServicePortal === 'string') {
          _ServicePortal = { path: _ServicePortal };
        }

        /* 拿到入口地址 */
        let entry = path.resolve(this.context, _ServicePortal.path);

        _entries[item] = devMode ? [ 'webpack-hot-middleware/client' ] : [];

        if (_exists(entry) === false) {
          throw Error('Can not find file.');
        }

        if (fs.statSync(entry).isDirectory() === true) {
          for (let mainFile of CONST_ENTRY_MAIN) {
            mainFile = path.join(entry, mainFile);

            /** 找到默认入口文件，退出遍历 */
            if (_exists(mainFile)) {
              entry = mainFile;
              break;
            }
          }
        }

        _entries[item].push(entry);

        const _HtmlWebpackPluginConf = {
          title     : 'xrosy app',
          hash      : true,
          filename  : `${item}.html`,
          minify    : true,
          showErrors: true,
          meta      : { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
          template  : path.join(path.dirname(entry), 'app.tpl'),
        };

        /* 未关闭模板配置的 */
        if (_ServicePortal.view !== false) {
          if (typeof _ServicePortal.view === 'string') {
            _HtmlWebpackPluginConf.template = path.resolve(path.dirname(entry), _ServicePortal.view);
          }

          /* 缓存到 SYMBOL_KEY 上，供其他字段读取 */
          this[SYM_HTML_WEBPACK_PLUGIN].push(new HtmlWebpackPlugin(_HtmlWebpackPluginConf));
        }
      });

      return _entries;
    };

    /* 设置私有属性 */
    /* -------------------------------------------------- */
    __setAttrPrivatization(this, SYM_ARGS);
    __setAttrPrivatization(this, SYM_PROFILE_CONFIGS);
    __setAttrPrivatization(this, SYM_HTML_WEBPACK_PLUGIN);
    /* -------------------------------------------------- */

    /* 初始化属性 */
    /* -------------------------------------------------- */
    this[SYM_ARGS] = argv;
    /* -------------------------------------------------- */

    // this.output = _mergeOutput();

    // this.entry = _mergeEntries();

    // this.plugins = this.plugins.concat();

    this.plugins = [
      /** 清除缓存 */
      new CleanWebpackPlugin({ dry: false, verbose: false }),
      // /** 使用进度显示 */
      // new webpack.ProgressPlugin(),
      // /** 在编译出现错误时，跳过输出阶段  */
      // new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      // new HtmlWebpackPlugin({
      //   chunks : [ 'library', 'utils', 'admin' ],
      // }),
      // new webpack.DefinePlugin({
      //   env : JSON.stringify(this.env),
      // }),

      ...this[SYM_HTML_WEBPACK_PLUGIN],
    ];


    console.log(util.inspect(this, { depth: 1 }));

    return;
    webpack(this, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(err);
      }

      console.log(stats.toString());
    });

    return {
      optimization : {
        splitChunks : {
          cacheGroups : {
            /**
             * 打包后的文件名，任意命名
             * 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
             */
            libs : { name: 'library', test: /node_modules/, chunks: 'initial', priority: 10 },
            /* 只要超出0字节就生成一个新包 */
            utils: { name: 'utils', chunks: 'initial', minSize: 0 },
          },
        },
      },
    };
  }

  get context() {
    return _getWorkspaceAbs(this.argv.workspace);
  }

  /* ------------------------------------ */
  mode = 'none';

  devtool = 'eval-source-map';

  // context = path.resolve('.');

  entry = {};

  output = {
    filename  : 'static/[name.hash:6].js',
    publicPath: '',
    pathinfo  : false,
  };

  resolve = {
    alias                 : {},
    extensions            : [ '.jsx', '.js' ],
    /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
    enforceExtension      : false,
    /* 对模块是否需要使用的扩展 */
    enforceModuleExtension: false,
    // modules : [ path.join(wpWorkspace, 'node_modules') ],
  };

  module = {
    rules : [
      {
        test: /\.(scss)$/,
        use : { loader: 'scss-loader' },
      },
      {
        test   : /\.(js|jsx)$/,
        use    : { loader: 'babel-loader', options: { presets: [ '@babel/preset-env', '@babel/preset-react' ]}},
        exclude: /(node_modules|bower_components)/,
      },
    ],
  };

  optimization = {
    minimize : true,
  };

}
