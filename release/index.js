"use strict";

var _command = _interopRequireDefault(require("@xrosy/command"));

var _package = _interopRequireDefault(require("../package.json"));

var _WPAgent = require("./WPAgent.js");

var _WPConfigConst = require("./WPConfig.const.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_command["default"].command('dev <workspace>').description('开发模式') // .option('-d, --dist-dir      <DIST_DIR_NAME>' , '指定打包输出的目录。（默认：--dist-dir=dist）')
.option('-e, --env           <env>', "\u6307\u5B9A\u73AF\u5883\u53D8\u91CF\u6807\u8BC6 (\u9ED8\u8BA4\uFF1A".concat(_WPConfigConst.DEFAULT_ENV, ")")).option('-p, --port          <port>', "\u8BBE\u7F6E\u6620\u5C04\u7684\u7AEF\u53E3\u53F7 (\u9ED8\u8BA4: ".concat(_WPConfigConst.DEFAULT_SERVICE_PORT, ")")).action(_WPAgent.devActivity);

_command["default"].command('build <workspace>').description('编译工程').option('-e, --env           <env flag>', '指定环境变量标识').option('-d, --dist-dir      <dist_path>', '指定打包输出的目录。（默认：--dist-dir=dist）').option('-N, --app-names     <app_names>', '指定需要打包的app模块名称。（默认: --app-name=all）').action(_WPAgent.buildActivity).on('--help', function () {});

_command["default"].version(_package["default"].version, '-v, --version', "\u8F93\u51FA\u7248\u672C\u53F7 (v".concat(_package["default"].version, ")")).parse(process.argv);
/* ---- */


if (!process.argv.slice(2).length) {
  _command["default"].help();
}