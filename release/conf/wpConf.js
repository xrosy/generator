"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var userConfigLoader = function userConfigLoader(projectDir) {
  var ymlPath = _path["default"].join(projectDir, "./.xrosyrc.yml");

  if (_fs["default"].existsSync(ymlPath) === false) {
    return {};
  }

  return _nodeYaml["default"].readSync(ymlPath, {
    encoding: "utf8"
  });
};

var XrosyConf =
/*#__PURE__*/
function () {
  function XrosyConf(settingsObj) {
    (0, _classCallCheck2["default"])(this, XrosyConf);
    this.__ = (0, _objectSpread2["default"])({}, settingsObj);
    this.engine = "react";
    this.env = this.getEnvironment();
    this.projectContext = this.getProjectContext();
    this.userConf = this.getUserConfig();
    this.entriesObj = this.getEntriesObj();
    this.ModuleRules = this.getModuleRules();
    this.resolveExtensions = this.getResolveExtensions();
  }

  (0, _createClass2["default"])(XrosyConf, [{
    key: "getProjectContext",
    value: function getProjectContext() {
      return this.projectContext || _path["default"].resolve(this.__.projectDir);
    }
  }, {
    key: "getEnvironment",
    value: function getEnvironment() {
      return this.__.env || process.env.xrosy_env || process.env.NODE_ENV || "dev";
    }
  }, {
    key: "getUserConfig",
    value: function getUserConfig() {
      return this.userConf || userConfigLoader(this.projectContext);
    }
  }, {
    key: "getEntriesObj",
    value: function getEntriesObj() {
      var entriesObj = {};
      var projectContext = this.getProjectContext();

      var _this$getUserConfig = this.getUserConfig(),
          entries = _this$getUserConfig.entries;

      return entries.map(function (app, keyIndex) {
        return _path["default"].join(projectContext, app);
      });
    }
  }, {
    key: "getResolveExtensions",
    value: function getResolveExtensions() {
      return [".js", ".jsx"];
    }
  }, {
    key: "getModuleRules",
    value: function getModuleRules() {
      return [{
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }];
    }
  }]);
  return XrosyConf;
}();
/* ---------------------------------------- */


var getProjectContext = function getProjectContext() {
  var targetPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
  return _path["default"].resolve(targetPath);
};
/**
 * 生成配置项目
 * @params    {object}      options - Customer
 * @return    {object}      webpack options
 */


var _default = function _default(_ref) {
  var workspace = _ref.workspace;
  var context = getProjectContext(workspace);
  /* Generate configs Object */

  return {
    context: context,
    mode: "none",
    entry: ['./src/admin/index.js'],
    output: {
      path: './build',
      filename: "[name].js" // publicPath: '',

    },
    // chunkFilename: 'libs',
    resolve: {
      /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
      // enforceExtension: true,
      // enforceModuleExtension: false,
      alias: {},
      extensions: [".js", ".jsx"]
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
    plugins: [new _webpack["default"].ProgressPlugin(), new _cleanWebpackPlugin["default"]({})],
    optimization: {
      minimize: true
    }
  };
};

exports["default"] = _default;