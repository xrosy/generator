"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var _webpack = _interopRequireDefault(require("webpack"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _server = _interopRequireDefault(require("./server.js"));

var _WPConfigConst = require("./WPConfig.const.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _PROFILE_SUPPORTED_LIST = ['.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc', '.xrosyrc.json'];

function _exists(strPath) {
  return _fs["default"].existsSync(strPath);
} // const _Default_Webpack_Config = {
//   entry : {
//     admin : [
//       'webpack-hot-middleware/client',
//       './src/admin/index.js',
//     ],
//   },
//   output : {
//     path      : wpOutputPath,
//     filename  : '[name].js',
//     publicPath: '/',
//     pathinfo  : false,
//   },
// };


var _getWorkspaceAbs = function _getWorkspaceAbs(dirPath) {
  if (typeof dirPath !== 'string') {
    throw Error('The \'workspace\' must be a string.');
  }

  var workspace = _path["default"].resolve(dirPath);

  if (!_exists(workspace)) {
    throw Error('The workspace is not exist.');
  }

  return workspace;
};

var _readConfigs = function _readConfigs(profile) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
  var profileName = (profile.split('/').pop() || '').toLowerCase();
  var profileConfigs = {};

  try {
    switch (profileName) {
      case '.xrosyrc.json':
        profileConfigs = require(profile);
        break;

      case '.xrosyrc.yaml':
      case '.xrosyrc.yml':
      case '.xrosyrc':
        profileConfigs = _nodeYaml["default"].readSync(profile, {
          encoding: encoding
        });
        break;
    }
  } catch (e) {
    throw e;
  }

  return profileConfigs;
};

var WPConfig =
/*#__PURE__*/
function () {
  function WPConfig() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WPConfig);

    var _args$env = args.env,
        env = _args$env === void 0 ? _WPConfigConst.DEFAULT_ENV : _args$env,
        _args$port = args.port,
        port = _args$port === void 0 ? _WPConfigConst.DEFAULT_SERVICE_PORT : _args$port,
        _args$workspace = args.workspace,
        workspace = _args$workspace === void 0 ? args : _args$workspace;
    this.env = String(env);
    this.port = String(+port || _WPConfigConst.DEFAULT_SERVICE_PORT);
    this.workspace = _getWorkspaceAbs(workspace);
    this.profile = this.getProfileConfig(); // return this.outputConfigs();
    // return {
    //   optimization : {
    //     splitChunks : {
    //       cacheGroups : {
    //         /**
    //          * 打包后的文件名，任意命名
    //          * 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
    //          */
    //         libs : { name: 'library', test: /node_modules/, chunks: 'initial', priority: 10 },
    //         /* 只要超出0字节就生成一个新包 */
    //         utils: { name: 'utils', chunks: 'initial', minSize: 0 },
    //       },
    //     },
    //   },
    // };
  }

  _createClass(WPConfig, [{
    key: "getProfileConfig",
    value: function getProfileConfig() {
      var _this = this;

      // const profilePath = this.getProfilePath();
      var profile = _PROFILE_SUPPORTED_LIST.find(function (itemString) {
        return _exists(_path["default"].join(_this.workspace, itemString));
      });

      if (typeof profile === 'undefined') return {};

      var profileConfigs = _readConfigs(_path["default"].join(this.workspace, profile));

      return _objectSpread({}, profileConfigs);
    }
  }, {
    key: "getOutput",
    value: function getOutput() {
      var _this$profile$output = this.profile.output,
          output = _this$profile$output === void 0 ? _WPConfigConst.DEFAULT_DIST_PATH : _this$profile$output;
      var _output$path = output.path,
          outputPath = _output$path === void 0 ? output : _output$path;
      var sysDefConfig = {
        filename: 'static/[name].js',
        pathinfo: false,
        path: null,
        publicPath: ''
      };

      if (typeof outputPath === 'string') {
        sysDefConfig.path = _path["default"].join(this.workspace, outputPath);
      }

      return sysDefConfig;
    }
  }, {
    key: "getEntries",
    value: function getEntries() {
      var _this2 = this;

      var entries = {};
      var _this$profile$service = this.profile.services,
          services = _this$profile$service === void 0 ? {} : _this$profile$service;
      Object.keys(services || {}).forEach(function (item) {
        var _ServicePortal = services[item];

        if (typeof _ServicePortal !== 'string') {
          _ServicePortal = _ServicePortal.path;
        }

        entries[item] = [];
        _this2._isDeveloper && entries[item].push('webpack-hot-middleware/client');
        entries[item].push(_path["default"].join(_this2.workspace, _ServicePortal));
      });
      return entries;
    }
  }, {
    key: "buildConfigs",
    value: function buildConfigs() {
      var output = this.getOutput();
      var entry = this.getEntries();
      var webpackConfigs = {
        output: output,
        entry: entry,
        mode: 'none',
        devtool: 'eval-source-map',
        context: this.workspace,
        resolve: {
          extensions: ['.jsx', '.js'],
          alias: {},

          /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
          enforceExtension: false,

          /* 对模块是否需要使用的扩展 */
          enforceModuleExtension: false // modules: [ path.join(wpWorkspace, 'node_modules') ],

        },
        module: {
          rules: [{
            test: /\.(scss)$/,
            use: {
              loader: 'scss-loader'
            }
          }, {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            },
            exclude: /(node_modules|bower_components)/
          }]
        },
        optimization: {
          minimize: true
        },
        plugins: [
        /** 清除缓存 */
        new _cleanWebpackPlugin["default"]({
          dry: false,
          verbose: false
        }),
        /** 使用进度显示 */
        // new webpack.ProgressPlugin(),

        /** 在编译出现错误时，跳过输出阶段  */
        new _webpack["default"].NoEmitOnErrorsPlugin(), new _webpack["default"].HotModuleReplacementPlugin(), new _htmlWebpackPlugin["default"]({
          chunks: ['library', 'utils', 'admin']
        }), new _webpack["default"].DefinePlugin({
          env: JSON.stringify(this.env)
        })]
      }; // console.log('WebpackConfigs:', webpackConfigs);

      return webpackConfigs;
    }
  }, {
    key: "devServer",
    value: function devServer() {
      // this.buildConfigs(true);
      this._isDeveloper = true;
      (0, _server["default"])((0, _webpack["default"])(this.buildConfigs()));
    }
  }, {
    key: "server",
    value: function server() {
      this._isDeveloper = false;
      (0, _webpack["default"])(this.buildConfigs(false), function (err, stats) {
        if (err || stats.hasErrors()) {
          // Handle errors here
          console.log(err);
        }

        console.log(stats.toString());
      });
    }
  }]);

  return WPConfig;
}();

exports["default"] = WPConfig;