import fs from 'fs';
import path from 'path';

import { Cat } from '@xrosy/cat';

/** 验证文件或者目录是否存在
 *
 * @param   {string}      strPath             - the absolute path for file or directory.
 * @return  {boolean}                         - the validate result.
 */
export const _exists = strPath => fs.existsSync(strPath);


export const mkdir = strPath => {
  const target = path.resolve(strPath);

  if (_exists(target) === false) {
    fs.mkdirSync(target, { recursive: true }, (err) => {
      console.log(err);
    });
  }
};


export const logger = new Cat({
  error  : '#redBright(:i-error)',
  warn   : '#yellowBright(:i-warn)',
  success: '#greenBright(:i-success)',
  info   : '#blueBright(:i-info)',
  log    : ':i-log',
  primary: ':i-log',
  debug  : '#cyanBright(:i-debug)',
});
