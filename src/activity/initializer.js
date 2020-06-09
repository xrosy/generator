import path from 'path';
import child from 'child_process';

import { logger as Logger } from '../utils';


function execCommandlineSync(commands) {
  return child.execSync(commands);
}


export default (workspace = '.', argv) => {
  const productDirectory = path.resolve(workspace);

  // spawn(command[, args:array][, options:object])
  // exec('ls -l | wc -l', function(err, stdout, stderr) {
  //  console.log(stdout);
  // });

  console.log(JSON.stringify(execCommandlineSync().toString()));
  console.log('111');
};
