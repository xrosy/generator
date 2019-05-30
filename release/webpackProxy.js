"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devActivity = exports.buildActivity = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var utils = _interopRequireWildcard(require("./utils.js"));

var _server = _interopRequireDefault(require("./server.js"));

var _defConf = require("./defConf.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var wpAgent = function wpAgent(_ref) {
  var _ref$workspace = _ref.workspace,
      workspace = _ref$workspace === void 0 ? '.' : _ref$workspace,
      port = _ref.port,
      env = _ref.env,
      distDir = _ref.distDir;
  var wpWorkspace = utils.getWorkspace(workspace);
  var customConf = utils.xrosyrc(wpWorkspace);

  var wpOutputPath = _path["default"].join(wpWorkspace, './build');

  var wpConfig = {
    context: wpWorkspace,
    mode: 'none',
    devtool: 'eval-source-map',
    entry: {
      admin: ['webpack-hot-middleware/client', './src/admin/index.js']
    },
    output: {
      path: wpOutputPath,
      filename: '[name].js',
      publicPath: '/',
      pathinfo: false
    },
    resolve: {
      /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
      alias: {},
      extensions: ['.js', '.jsx'],
      enforceExtension: false,

      /* 对模块是否需要使用的扩展 */
      enforceModuleExtension: false // modules: [ path.join(wpWorkspace, 'node_modules') ],

    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }]
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
          libs: {
            name: 'library',
            test: /node_modules/,
            chunks: 'initial',
            // 打包后的文件名，任意命名
            // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            priority: 10
          },
          utils: {
            name: 'utils',
            chunks: 'initial',
            // 只要超出0字节就生成一个新包
            minSize: 0
          }
        }
      }
    }
  };
  return (0, _webpack["default"])(wpConfig);
};
/* -------------------------------------------------------------------------- */

/*  */


var buildActivity = function buildActivity(workspace, args) {
  var env = args.env,
      _args$port = args.port,
      port = _args$port === void 0 ? _defConf.CONST_PORT : _args$port;
  wpAgent({
    workspace: workspace
  });
};
/*  */


exports.buildActivity = buildActivity;

var devActivity = function devActivity(workspace, args) {
  var env = args.env,
      _args$port2 = args.port,
      port = _args$port2 === void 0 ? _defConf.CONST_PORT : _args$port2;
  (0, _server["default"])(wpAgent({
    workspace: workspace
  }));
};

exports.devActivity = devActivity;