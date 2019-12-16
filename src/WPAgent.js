/* eslint-disable max-nested-callbacks */
import path from 'path';
import fs from 'fs';

import * as utils from './utils.js';
import builtIn from './WPConfigs.js';

const cat = utils.logger;

const PRO_DIRECTORY_LIST = [ 'library', 'documents', 'static', 'src', 'src/apps', 'src/configs', 'src/server', 'src/utils', 'test' ];

/* 导出 init 接口 */
export const initActivity = (directory, {
  parent: { _version: version },
  force = false,
  recursive = true,
}) => {
  const resource = utils.getResourceAbsolutePath();
  const project = path.resolve('.', directory);

  cat.info('Oulate version: ', utils.PKG_VERSION);

  /** 生成目录结构 */

  fs.mkdirSync(project, { recursive: recursive === true });

  cat.info('工程：', project);

  PRO_DIRECTORY_LIST.forEach((dir) => {
    utils.mkdirSync(path.resolve('.', directory, dir), { force: force === true, recursive: recursive === true });
    cat.success('创建：', path.join(directory, dir));
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
      cat.success('创建：', path.join(directory, file));
    }
    catch (err) {
      cat.error('失败：', path.join(directory, file), String(err.code).toUpperCase() === 'EEXIST' ? '\t#redBright([已存在])' : '');
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


/* 导出 build 接口 */
export const buildActivity = (workspace, {
  env,
  serverPort:serverport = 3000,
  _name: mode,
  _description: description,
  parent: {
    _version: version,
  },
  ...args
}) => {
  // return console.log(args);

  cat.clear();
  cat.debug(utils.PKG_NAME, `v${version}`);
  cat.debug('mode:', mode, `(${description})`);

  builtIn({ workspace, env, mode, description, version, serverport });
};
