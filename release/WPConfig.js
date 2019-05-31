"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var _webpack = _interopRequireDefault(require("webpack"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _server = _interopRequireDefault(require("./server.js"));

var _WPConfigConst = require("./WPConfig.const.js");

/* eslint-env es6 */

/* eslint no-template-curly-in-string: "error" */

/* eslint indent: "off" */
var _PROFILE_SUPPORTED_LIST = ['.xrosyrc', '.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc.json'];

function __setAttrPrivatization(obj, name) {
  Object.defineProperty(obj || {}, name, {
    writable: true,
    enumerable: false
  });
}
/** 验证文件或者目录是否存在
 *
 * @param   {string}      strPath             - the absolute path for file or directory.
 * @return  {boolean}                         - the validate result.
 */


function _exists(strPath) {
  return _fs["default"].existsSync(strPath);
}
/** 获取项目工作目录的绝对路径
 * @param   {string}      dirPath             - 项目相对运行位置的相对地址或者项目的绝对地址
 * @return  {string}                          - 工作目录的绝对
 */


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
  (0, _createClass2["default"])(WPConfig, [{
    key: "webpackConfigs",
    get: function get() {
      var output = this.getOutput(); // const entry = this.getEntries();

      var webpackConfigs = {
        context: this.context,
        output: output,
        entry: this.entry,
        resolve: this.resolve,
        mode: 'none',
        devtool: 'eval-source-map',
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
      };
      return webpackConfigs;
    }
  }, {
    key: "args",
    set: function set(value) {
      var symKey = Symbol["for"]('args');

      __setAttrPrivatization(this, symKey);

      this[symKey] = value;
    },
    get: function get() {
      return this[Symbol["for"]('args')];
    }
  }, {
    key: "developer",
    get: function get() {
      return this.args.developer === true || false;
    }
  }, {
    key: "profileConfigs",
    get: function get() {
      var _this = this;

      var symKey = Symbol["for"]('profileConfigs');
      var _profileConfigs = this[symKey];

      if (typeof _profileConfigs !== 'undefined') {
        return _profileConfigs;
      }

      var _profileName = _PROFILE_SUPPORTED_LIST.find(function (itemString) {
        return _exists(_path["default"].resolve(_this.context, itemString));
      });

      if (_profileName) {
        _profileConfigs = _readConfigs(_path["default"].resolve(this.context, _profileName));
      }

      __setAttrPrivatization(this, symKey);

      this[symKey] = (0, _objectSpread2["default"])({}, _profileConfigs);
      return this[symKey];
    }
  }, {
    key: "serverPort",
    get: function get() {
      return _WPConfigConst.DEFAULT_SERVICE_PORT;
    }
    /* ------------------------------------ */

  }]);

  function WPConfig() {
    var _this2 = this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, WPConfig);
    (0, _defineProperty2["default"])(this, "context", _path["default"].resolve('.'));
    (0, _defineProperty2["default"])(this, "devtool", 'eval-source-map');
    (0, _defineProperty2["default"])(this, "mode", 'none');
    (0, _defineProperty2["default"])(this, "resolve", {
      extensions: ['.jsx', '.js'],
      alias: {},

      /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
      enforceExtension: false,

      /* 对模块是否需要使用的扩展 */
      enforceModuleExtension: false // modules: [ path.join(wpWorkspace, 'node_modules') ],

    });
    (0, _defineProperty2["default"])(this, "module", {
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
    });
    (0, _defineProperty2["default"])(this, "optimization", {
      minimize: true
    });
    (0, _defineProperty2["default"])(this, "plugins", [// /** 清除缓存 */
      // new CleanWebpackPlugin({ dry: false, verbose: false }),
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
    ]);
    (0, _defineProperty2["default"])(this, "output", {
      filename: 'static/[name].js',
      pathinfo: false,
      publicPath: ''
    });

    var _mergeOutput = function _mergeOutput() {
      var _this2$profileConfigs = _this2.profileConfigs.output,
          output = _this2$profileConfigs === void 0 ? _WPConfigConst.DEFAULT_DIST_PATH : _this2$profileConfigs;
      var _output$path = output.path,
          outputPath = _output$path === void 0 ? output : _output$path;
      return {
        filename: 'static/[name.hash:6].js',
        path: _path["default"].resolve(_this2.context, outputPath),
        publicPath: '',
        pathinfo: false
      };
    };

    var _mergeEntries = function _mergeEntries() {
      var _this2$profileConfigs2 = _this2.profileConfigs.services,
          services = _this2$profileConfigs2 === void 0 ? {} : _this2$profileConfigs2;
      var _entries = {};
      Object.keys(services).forEach(function (item) {
        var _ServicePortal = services[item];

        if (typeof _ServicePortal === 'string') {
          _ServicePortal = {
            path: _ServicePortal
          };
        }

        var entry = _path["default"].resolve(_this2.context, _ServicePortal.path);

        _entries[item] = _this2.developer ? ['webpack-hot-middleware/client'] : [];
        /** Handle param is directory path */

        if (_exists(entry) && _fs["default"].statSync(entry).isDirectory()) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _WPConfigConst.CONST_ENTRY_MAIN[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var mainFile = _step.value;

              var entryFile = _path["default"].join(entry, mainFile);

              if (_exists(entryFile)) {
                entry = entryFile;
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        _entries[item].push(entry);

        var _HtmlWebpackPluginConf = {
          filename: "".concat(item, ".html"),
          minify: true,
          showErrors: true,
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
          },
          template: _path["default"].join(_path["default"].dirname(entry), 'app.tpl')
        };

        if (_ServicePortal.view !== false) {
          if (typeof _ServicePortal.view === 'string') {
            _HtmlWebpackPluginConf.template = _ServicePortal.view;
          }

          _this2[Symbol["for"]('HtmlWebpackPlugin')].push(new _htmlWebpackPlugin["default"](_HtmlWebpackPluginConf));
        }
      });
      console.log(_this2[Symbol["for"]('HtmlWebpackPlugin')]);
      return _entries;
    };

    this[Symbol["for"]('HtmlWebpackPlugin')] = [];

    __setAttrPrivatization(this, Symbol["for"]('HtmlWebpackPlugin'));
    /* -------------------------------------------------- */


    this.args = args;
    this.context = _getWorkspaceAbs(this.args.workspace);
    var _profile = this.profileConfigs;
    this.output = _mergeOutput();
    this.entry = _mergeEntries(); // handle optimization
    // handle plugins;
    // console.log(this.profileConfigs);
    // console.log(this);

    return;
    (0, _webpack["default"])(this, function (err, stats) {
      if (err || stats.hasErrors()) {
        console.log(err);
      }

      console.log(stats.toString());
    }); // return {
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
  /* ------------------------------------ */


  return WPConfig;
}();

exports["default"] = WPConfig;