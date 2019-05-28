"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildActivity = exports.devActivity = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var utils = _interopRequireWildcard(require("./utils.js"));

var _server = _interopRequireDefault(require("./server.js"));

var _WPConfig = _interopRequireDefault(require("./WPConfig.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var wpAgent = function wpAgent(_ref) {
  var _ref$workspace = _ref.workspace,
      workspace = _ref$workspace === void 0 ? '.' : _ref$workspace,
      port = _ref.port,
      env = _ref.env,
      distDir = _ref.distDir;
  var wpConfigs = new _WPConfig["default"](workspace);
  console.log(wpConfigs);
  return;
  var wpWorkspace = utils.getWorkspace(workspace);
  var userConf = utils.xrosyrc(wpWorkspace);

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


var devActivity = function devActivity(workspace, args) {
  var port = args.port,
      env = args.env;
  var wpConfig = new _WPConfig["default"](_objectSpread({}, args, {
    workspace: workspace
  }));
  console.log(wpConfig); // wpConfig.start();
  // wpConfig.devServer(port);
  // devServer(wpAgent({ workspace }));
};
/*  */


exports.devActivity = devActivity;

var buildActivity = function buildActivity(workspace, args) {
  var env = args.env,
      port = args.port; // wpAgent({ workspace });
};

exports.buildActivity = buildActivity;