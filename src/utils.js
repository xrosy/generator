import fs from 'fs';
import path from 'path';

import { Cat } from '@xrosy/cat';

import * as packageInfo from '../package.json';


export const PKG_VERSION = packageInfo.version;

export const getResourceAbsolutePath = () => path.join(__dirname, '../resource');


export const logger = new Cat({
  error  : '#redBright(:i-error)',
  warn   : '#yellowBright(:i-warn)',
  success: '#greenBright(:i-success) %s',
  info   : '#blueBright(:i-info)',
  log    : ':i-log',
  primary: '#greenBright(\u27a5 %s)',
  debug  : '#cyanBright(:i-debug %s)',
});


/** 验证文件或者目录是否存在
 *
 * @param   {string}      strPath             - the absolute path for file or directory.
 * @return  {boolean}                         - the validate result.
 */
export const exists = (pathStr) => fs.existsSync(pathStr);


/** 创建文件夹 */
export const mkdir = (abs, { force = false, recursive = true }) => {
  const isExists = exists(abs);

  return new Promise((resolve, reject) => {
    if (isExists === false || force === true) {
      fs.mkdir(abs, { recursive: recursive === true }, (err) => {
        if (err) throw err;

        logger.success('[SUCCESS]', abs);

        resolve(abs);
      });
    }

    resolve();
  });
};

export const mkdirSync = (abs, { force = false, recursive = true }) => {
  fs.mkdirSync(abs, { force, recursive });
};
