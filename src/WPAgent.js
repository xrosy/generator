/* eslint-disable max-nested-callbacks */
/* eslint-disable no-multi-spaces */

import path                                                              from 'path';
import fs                                                                from 'fs';

import webpack                                                           from 'webpack';

import { CONST_DEVELOPMENT, CONST_PRODUCTION, DEFAULT_ENV, SERVER_PORT } from './constant';
import * as utils                                                        from './utils.js';
import server                                                            from './server';
import webpackConfigs                                                    from './WPConfigs.js';


const console = utils.logger;
const PRO_DIRECTORY_LIST = [ 'library', 'documents', 'static', 'src', 'src/apps', 'src/configs', 'src/server', 'src/utils', 'test' ];


/* 导出 build 接口 */
export const buildActivity = (work = '.', {
  env     = DEFAULT_ENV,
  port    = SERVER_PORT,
  service = false,

  _name       : mode,
  _description: description,
  parent      : { _version: version },

  ...args
}) => {
  const wpConfigs = webpackConfigs({ env, mode, productDirectory: work });
  const wpCompiler = webpack({
    ...wpConfigs,
    stats : 'errors-only',
  });


  switch (mode.toLowerCase()) {
    case 'dev':
    case 'build': {
      console.clear();
      console.debug('mode     :', `${description ? `${description} - ${mode}` : mode }`);
      console.debug('version  :', `v${version}`);
      console.debug('env      :', `${env}`);
      console.debug('workspace:', `${process.cwd()}`);
      console.debug('port     :', `${port}`);


      if (mode.toLowerCase() === 'build' && service === false)  {
        // return console.log(wpConfigs);

        wpCompiler.run((err, stats) => {
          const { startTime, endTime } = stats;

          process.stdout.write(stats.toString({ colors: true, chunks: true }));
          process.stdout.write('\n');

          process.stdout.write(`Time     : ${(endTime - startTime) / 1000} 秒\n`);
          process.stdout.write('Compile successful！\n');
        });

        return;
      }

      server({
        wpCompiler,
        env,
        port,
        mode : wpConfigs.mode,
      });

      return;
    }

    case 'server': {
      server({
        wpCompiler,
        env,
        port,
        mode : mode === CONST_PRODUCTION ? CONST_PRODUCTION : CONST_DEVELOPMENT,
        ...args,
      });

      return;
    }
  }


  // builtIn({ workspace, env, mode, description, version, serverport, service });
};


/* 导出 init 接口 */
export const initActivity = (directory, {
  parent: { _version: version },
  force = false,
  recursive = true,
}) => {
  const resource = utils.getResourceAbsolutePath();
  const project = path.resolve('.', directory);

  console.info('Oulate version: ', utils.PKG_VERSION);

  /** 生成目录结构 */

  fs.mkdirSync(project, { recursive: recursive === true });

  console.info('工程：', project);

  PRO_DIRECTORY_LIST.forEach((dir) => {
    utils.mkdirSync(path.resolve('.', directory, dir), { force: force === true, recursive: recursive === true });
    console.success('创建：', path.join(directory, dir));
  });

  /** 复制必要文件到项目目录下 */
  if (utils.exists(resource) === false) {
    throw Error(`Missing: Can\'t not found ${resource}`);
  }

  fs.readdirSync(resource).forEach((file) => {
    const sf = path.join(resource, file);
    const tf = path.join(project, file);

    try {
      fs.copyFileSync(sf, tf, +!force);
      console.success('创建：', path.join(directory, file));
    }
    catch (err) {
      console.error('失败：', path.join(directory, file), String(err.code).toUpperCase() === 'EEXIST' ? '\t#redBright([已存在])' : '');
    }
  });

  // 写入 package.json
  // fs.writeFile(filename, data[, options], callback)
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({
    name        : path.basename(directory),
    version     : '1.0.0',
    author      : 'ChenZhenyuan <jason@chenzhenyuan.com>',
    license     : 'MIT',
    main        : './release/main.js',
    dependencies: {
      '@xrosy/generator' : `^${utils.PKG_VERSION}`,
    },
    devDependencies : {
      'eslint'             : '^5.16.0',
      'eslint-config-xrosy': '^0.1.52',
    },
  }, null, 2));
};
