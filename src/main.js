import xrosy from '@xrosy/command';

import * as packageInfo from '../package.json';
import { initActivity, buildActivity } from './WPAgent.js';
import { DEFAULT_ENV, DEFAULT_SERVICE_PORT } from './constant.js';

// const DEFAULT_ENV = 'dev';
// const DEFAULT_SERVICE_PORT = 3000;

xrosy
  .command('init <directory>')
  .description('初始化工程目录')
  .option('-f, --force', '如果目录存在，强制使用新的配置初始化')
  .action(initActivity);


xrosy
  .command('dev [workspace]')
  .description('开发模式')
  .option('-e, --env <env>', `指定环境变量标识 (默认：${DEFAULT_ENV})`)
  .option('-p, --server-port <port>', `设置映射的端口号 (默认: ${DEFAULT_SERVICE_PORT})`)
  .action(buildActivity)
  .on('--help', () => {});


xrosy
  .command('build [workspace]')
  .description('编译模式')
  .option('-e, --env           <env_flag>', '指定环境变量标识')
  .option('-p, --server-port <port>', `设置映射的端口号 (默认: ${DEFAULT_SERVICE_PORT})`)
  .option('-s, --service', '在打包编译完成后启动Web服务器')
  .option('-d, --dist-dir      <dist_path>', '指定打包输出的目录。（默认：--dist-dir=dist）')
  .option('-N, --app-names     <app_names>', '指定需要打包的app模块名称。（默认: --app-name=all）')
  .action(buildActivity)
  .on('--help', () => {});


xrosy.version(packageInfo.version, '-v, --version', `输出版本号 (v${packageInfo.version})`).parse(process.argv);

/* ---- */
if (!process.argv.slice(2).length) {
  xrosy.help();
}
