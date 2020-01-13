/* eslint-disable max-nested-callbacks */
import path from 'path';
import fs from 'fs';

import logger from '@xrosy/cat';

export const initActivity = (directory, { force = false, ...argv }) => {
  const project = path.resolve('.', directory);
  const resource = path.join(__dirname, '../resource');

  logger.info('项目:', project);
  logger.clear('项目:', project);

  const mkdir = (...directories) => Promise.all(Array.from(directories).map((dir) => {
    const target = path.join(project, dir);

    return new Promise((resolve, reject) => {
      fs.mkdir(target, { recursive: true }, (err) => {
        if (err) {
          return reject(err);
        }

        resolve(target);
      });
    });
  }));

  mkdir(
    'documents', 'test', 'static', 'src', 'src/apps', 'src/configs', 'src/server', 'src/utils',
  ).then(() => new Promise((resolve, reject) => {
    if (utils._exists(resource) === false) {
      throw Error(`Missing: Can\'t not found ${resource}`);
    }

    fs.readdir(resource, (err, files) => {
      if (err) return reject(err);

      resolve(files);
    });
  })).then(files => {
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

          logger.success('创建:', dest);
        });
      });
    });

    return Promise.all(promiseTask);
  }).then(() => {
    const pkgDesk = path.join(project, 'package.json');
    const pkgName = path.basename(project);
    const pkgContent = {
      name   : pkgName,
      version: '0.1.0',
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
