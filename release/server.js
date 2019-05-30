"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _WPConfigConst = require("./WPConfig.const.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(wpCompiler) {
  console.log(wpCompiler);
  var server = (0, _express["default"])();
  server.use((0, _webpackDevMiddleware["default"])(wpCompiler, {
    publicPath: wpCompiler.options.publicPath,
    headers: {
      'X-Custom-Header': 'yes'
    },
    logLevel: 'error'
  }));
  server.use((0, _webpackHotMiddleware["default"])(wpCompiler, {
    noInfo: true
  }));
  server.listen(_WPConfigConst.DEFAULT_SERVICE_PORT, function (err) {
    if (err) return console.log(err);
    console.info("Listening on port 3000. Open up http://0.0.0.0:".concat(_WPConfigConst.DEFAULT_SERVICE_PORT, "/ in your browser."));
  });
};

exports["default"] = _default;