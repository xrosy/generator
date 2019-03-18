"use strict";

var xrosy = require('xrosy-command');

var packageInfo = require('../package.json');

var _require = require('./libs/wp.js'),
    devActivity = _require.devActivity,
    buildActivity = _require.buildActivity;

xrosy.command('dev <PROJECT_PATH>').description('开发模式') // .option('-d, --dist-dir      <DIST_DIR_NAME>' , '指定打包输出的目录。（默认：--dist-dir=dist）')
.option('-p, --port          [PORT]', '设置映射的端口号 (默认: 9090)').option('-m, --env           <ENV_NAME>', '手动指定环境变量标识').action(devActivity);
xrosy.command('build <PROJECT_PATH>').description('编译工程').option('-d, --dist-dir      <dist_path>', '指定打包输出的目录。（默认：--dist-dir=dist）').option('-e, --env           <env name>', '手动指定环境变量标识').option('-N, --app-names     <app_names>', '指定需要打包的app模块名称。（默认: --app-name=all）').action(buildActivity).on('--help', function () {});
xrosy.version(packageInfo.version, '-v, --version', "\u8F93\u51FA\u7248\u672C\u53F7 (v".concat(packageInfo.version, ")")).parse(process.argv);
/* ---- */

if (!process.argv.slice(2).length) {
  xrosy.help();
}