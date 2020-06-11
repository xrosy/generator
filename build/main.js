/* eslint-disable no-multi-spaces */
import rox from '@xrosy/command';

import { initialHandler } from './handler';

rox
  .command('init <directory>')
  .description('初始化工程目录')
  .option('-f, --force', '如果目录存在，强制使用新的配置初始化')
  .action(initialHandler);
