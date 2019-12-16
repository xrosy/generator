"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_command=_interopRequireDefault(require("@xrosy/command")),packageInfo=_interopRequireWildcard(require("../package.json")),_WPAgent=require("./WPAgent.js"),_constant=require("./constant.js");// const DEFAULT_ENV = 'dev';
// const DEFAULT_SERVICE_PORT = 3000;
_command["default"].command("init <directory>").description("\u521D\u59CB\u5316\u5DE5\u7A0B\u76EE\u5F55").option("-f, --force","\u5982\u679C\u76EE\u5F55\u5B58\u5728\uFF0C\u5F3A\u5236\u4F7F\u7528\u65B0\u7684\u914D\u7F6E\u521D\u59CB\u5316").action(_WPAgent.initActivity),_command["default"].command("dev [workspace]").description("\u5F00\u53D1\u6A21\u5F0F").option("-e, --env <env>","\u6307\u5B9A\u73AF\u5883\u53D8\u91CF\u6807\u8BC6 (\u9ED8\u8BA4\uFF1A".concat(_constant.DEFAULT_ENV,")")).option("-p, --server-port <port>","\u8BBE\u7F6E\u6620\u5C04\u7684\u7AEF\u53E3\u53F7 (\u9ED8\u8BA4: ".concat(_constant.DEFAULT_SERVICE_PORT,")")).action(_WPAgent.buildActivity).on("--help",function(){}),_command["default"].command("build [workspace]").description("\u7F16\u8BD1\u6A21\u5F0F").option("-s, --service","\u5728\u6253\u5305\u7F16\u8BD1\u5B8C\u6210\u540E\u542F\u52A8Web\u670D\u52A1\u5668").option("-e, --env           <env_flag>","\u6307\u5B9A\u73AF\u5883\u53D8\u91CF\u6807\u8BC6").option("-d, --dist-dir      <dist_path>","\u6307\u5B9A\u6253\u5305\u8F93\u51FA\u7684\u76EE\u5F55\u3002\uFF08\u9ED8\u8BA4\uFF1A--dist-dir=dist\uFF09").option("-N, --app-names     <app_names>","\u6307\u5B9A\u9700\u8981\u6253\u5305\u7684app\u6A21\u5757\u540D\u79F0\u3002\uFF08\u9ED8\u8BA4: --app-name=all\uFF09").action(_WPAgent.buildActivity).on("--help",function(){}),_command["default"].version(packageInfo.version,"-v, --version","\u8F93\u51FA\u7248\u672C\u53F7 (v".concat(packageInfo.version,")")).parse(process.argv),process.argv.slice(2).length||_command["default"].help();