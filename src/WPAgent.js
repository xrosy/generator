/* eslint-disable max-nested-callbacks */
import path from 'path';
import fs from 'fs';

import * as utils from './utils.js';
import WPConfig from './WPConfig.js';

const { logger } = utils;

/* 导出 init 接口 */
export const initActivity = (directory, { force = false, ...argv }) => {
  const project = path.resolve('.', directory);
  const resource = path.join(__dirname, '../resource');

  logger.info(`[:datetime] [PROJECT PATH]: ${project}`);

  const mkdir = (...directories) => {
    function _PromiseHandler (dir) {
      const target = path.join(project, dir);

      return new Promise((resolve, reject) => {
        fs.mkdir(target, { recursive: true }, (err) => {
          if (err) {
            return reject(err);
          }

          resolve(target);
        });
      });
    }

    return Promise.all(Array.from(directories).map(_PromiseHandler));
  };


  /** 生成目录结构 */
  Promise.all([
    'documents',
    'test',
    'static',
    'src',
    'src/apps',
    'src/configs',
    'src/server',
    'src/utils'
  ].map((dir) => {
    const target = path.join(project, dir);

    return new Promise((resolve, reject) => {
      fs.mkdir(target, { recursive: true }, (err) => {
        if (err) {
          logger.error('success:', target);

          return reject(err);
        }

        logger.success('success:', target);
        resolve(target);
      });
    });
  })).then(() => {
    function _PromiseHandler(resolve, reject) {
      if (utils._exists(resource) === false) {
        throw Error(`Missing: Can\'t not found ${resource}`);
      }

      fs.readdir(resource, (err, files) => {
        if (err) return reject(err);

        resolve(files);
      });
    }

    return new Promise(_PromiseHandler);
  }).then((files) => {
    if (Array.isArray(files) === false || files.length === 0) {
      return [];
    }

    const sourceFiles = files.map(file => path.join(resource, file));

    const promiseTask = sourceFiles.map((target) => {
      const _basename = path.basename(target);

      return new Promise((resolve, reject) => {
        const dest = path.join(project, _basename);

        fs.copyFile(target, dest, (err) => {
          if (err) return reject(err);
          resolve();

          logger.success('success:', dest);
        });
      });
    });

    return Promise.all(promiseTask);
  }).then(() => {
    /**
     * 生成默认 package.json 文件
     */
    const pkgDesk = path.join(project, 'package.json');
    const pkgName = path.basename(project);
    const pkgContent = {
      name   : pkgName,
      version: '1.0.0',
      license: 'MIT',
      scripts: {
        dev : 'npx xrosy dev .',
      },
      dependencies : {
        '@xrosy/generator' : '^0.1.0',
      },
    };

    fs.writeFileSync(pkgDesk, JSON.stringify(pkgContent, null, 2));
  }).then(() => {
    // - 初始化项目
  });
};


/* 导出 dev 接口 */
export const devActivity = (workspace, args) => {
  new WPConfig({ ...args, workspace });
};


/* 导出 build 接口 */
export const buildActivity = (workspace, args) => {
  new WPConfig({ ...args, workspace });
};
