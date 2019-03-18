"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _webpack = _interopRequireDefault(require("webpack"));

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userConfigLoader = function userConfigLoader(projectDir) {
  var ymlPath = _path.default.join(projectDir, "./.xrosyrc.yml");

  if (_fs.default.existsSync(ymlPath) === false) {
    return {};
  }

  return _nodeYaml.default.readSync(ymlPath, {
    encoding: "utf8"
  });
};

var XrosyConf =
/*#__PURE__*/
function () {
  function XrosyConf(settingsObj) {
    _classCallCheck(this, XrosyConf);

    this.__ = _objectSpread({}, settingsObj);
    this.engine = "react";
    this.env = this.getEnvironment();
    this.projectContext = this.getProjectContext();
    this.userConf = this.getUserConfig();
    this.entriesObj = this.getEntriesObj();
    this.ModuleRules = this.getModuleRules();
    this.resolveExtensions = this.getResolveExtensions();
  }

  _createClass(XrosyConf, [{
    key: "getProjectContext",
    value: function getProjectContext() {
      return this.projectContext || _path.default.resolve(this.__.projectDir);
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
        return _path.default.join(projectContext, app);
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
  return _path.default.resolve(targetPath);
};

var _default = function _default(_ref) {
  var projectPath = _ref.projectPath;
  var context = getProjectContext(projectPath);
  /* Generate configs Object */

  return {
    context: context,
    mode: "none",
    entry: ["./src/apps/admin/main"],
    output: {
      path: "/Users/jason/workspace/xrosy-generator/example/build",
      filename: "bundle.js"
    },
    optimization: {
      minimize: true
    },
    resolve: {
      alias: {},

      /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
      enforceExtension: true,
      enforceModuleExtension: false,
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }]
    },
    plugins: []
  };
};

exports.default = _default;