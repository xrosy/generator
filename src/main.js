
const xrosy       = require('xrosy-command');
const packageInfo = require('../package.json');



xrosy
  .command('dev <PROJECT_PATH>')
  .description('开发模式')
  .option('-d, --dist-dir      <DIST_DIR_NAME>' , '指定打包输出的目录。（默认：--dist-dir=dist）')
  .option('-p, --port          [PORT]'          , '设置映射的端口号 (默认: 9090)')
  .option('-m, --env           <ENV_NAME>'      , '手动指定环境变量标识')
  .action(require('./model/dev'))


// xrosy
//   .command('build <project>')
//   .description('编译工程')
//   .option('-m, --env           <env name>', '手动指定环境变量标识')
//   .option('-m, --app-names     <app_names>', '指定需要打包的app模块名称。（默认: --app-name=all）')
//   .option('-d, --dist-dir      <dist_path>', '指定打包输出的目录。（默认：--dist-dir=dist）')
//   .action((env) => env)
//   .on('--help', () => {});


xrosy
  .version(packageInfo.version, '-v, --version', `输出版本号 (v${packageInfo.version})`)
  .parse(process.argv);


/* ---- */
if (!process.argv.slice(2).length) {
  xrosy.help();
}