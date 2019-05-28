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

var _defConf = require("./defConf.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _SupporterProfileList = ['.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc', '.xrosyrc.json']; // const exists = (strPath) => fs.existsSync(strPath);

function _exists(strPath) {
  return _fs["default"].existsSync(strPath);
}

var _readYamlConfig = function _readYamlConfig(targetPath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
  var userConf = {};

  try {
    userConf = _nodeYaml["default"].readSync(targetPath, {
      encoding: encoding
    });
  } catch (e) {
    console.error(e);
  }

  return userConf;
}; // const _Default_Webpack_Config = {
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

var WPConfig =
/*#__PURE__*/
function () {
  function WPConfig() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WPConfig);

    var _args$env = args.env,
        env = _args$env === void 0 ? _defConf.DEFAULT_ENV : _args$env,
        _args$port = args.port,
        port = _args$port === void 0 ? _defConf.DEFAULT_SERVICE_PORT : _args$port,
        _args$workspace = args.workspace,
        workspace = _args$workspace === void 0 ? args : _args$workspace;
    this.env = String(env);
    this.port = String(+port || _defConf.DEFAULT_SERVICE_PORT);
    this.workspace = _getWorkspaceAbs(workspace);
    this.profile = this.getProfileConfig();
    return;
    return {
      mode: 'none',
      devtool: 'eval-source-map',
      context: this.wpWorkspace,
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
      resolve: {
        alias: {},
        extensions: ['.js', '.jsx'],

        /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
        enforceExtension: false,

        /* 对模块是否需要使用的扩展 */
        enforceModuleExtension: false // modules: [ path.join(wpWorkspace, 'node_modules') ],

      },
      plugins: [new _cleanWebpackPlugin["default"]({
        dry: false,
        verbose: false
      }), new _webpack["default"].DefinePlugin({
        env: JSON.stringify(process.env.NODE_ENV || 'dev')
      }), // new webpack.ProgressPlugin(),
      new _webpack["default"].HotModuleReplacementPlugin(), new _webpack["default"].NoEmitOnErrorsPlugin(), new _htmlWebpackPlugin["default"]({
        chunks: ['library', 'utils', 'admin']
      })],
      optimization: {
        minimize: true,
        splitChunks: {
          cacheGroups: {
            /**
             * 打包后的文件名，任意命名
             * 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
             */
            libs: {
              name: 'library',
              test: /node_modules/,
              chunks: 'initial',
              priority: 10
            },

            /* 只要超出0字节就生成一个新包 */
            utils: {
              name: 'utils',
              chunks: 'initial',
              minSize: 0
            }
          }
        }
      }
    };
  }

  _createClass(WPConfig, [{
    key: "getWebpackConfigs",
    value: function getWebpackConfigs() {}
  }, {
    key: "getProfilePath",
    value: function getProfilePath() {
      var profile;

      for (var _i = 0, _SupporterProfileList2 = _SupporterProfileList; _i < _SupporterProfileList2.length; _i++) {
        var profileName = _SupporterProfileList2[_i];

        var profileAbsPath = _path["default"].join(this.workspace, profileName);

        if (_exists(profileAbsPath)) {
          profile = profileAbsPath;
          break;
        }
      }

      return profile;
    }
  }, {
    key: "getProfileConfig",
    value: function getProfileConfig() {
      var profilePath = this.getProfilePath();
      var configs = {};
      console.log(profilePath); // _SupporterProfileList.find((profile)=>{
      //   const profileAbsPath = path.join(this.workspace, profile);
      //   if (_exists(profile)) {
      //     configs = _readYamlConfig(profile);
      //     return true;
      //   }
      //   return false;
      // });
      // for ( let profile of _SupporterProfileList ) {
      //   profile = path.join(this.workspace, profile);
      //   if (_exists(profile)) {
      //     configs = _readYamlConfig(profile);
      //     this.profile = profile;
      //     break;
      //   }
      // }

      return configs;
    }
  }, {
    key: "devServer",
    value: function devServer() {
      (0, _server["default"])((0, _webpack["default"])(this.getWebpackConfigs()));
    }
  }, {
    key: "start",
    value: function start() {
      (0, _webpack["default"])(this.getWebpackConfigs());
    }
  }]);

  return WPConfig;
}();

exports["default"] = WPConfig;