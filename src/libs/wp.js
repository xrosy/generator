import path    from 'path';
import webpack from 'webpack';
import wpConf  from './conf.js'
import utils   from './utils.js';


const {
  CONST_PORT,
  CONST_DIST_PATH,
  CONST_ENV
} = require('../defConf.js');

const wpInstance = ({ port, env, distDir, sourceWorkDir = '.' }) => {
  const _CONFIGS_ = wpConf({
    env,
    port,
    distDir,
    projectDir: sourceWorkDir,
  });

  console.log(_CONFIGS_);

  /**
   * Webpack configs
   */
  // const wpCompiler = webpack(_CONFIGS_);
  // wpCompiler.run((err, stats)=>{});


}




exports.devActivity = (sourceWorkDir, args)=>{
  const {
      port     = CONST_PORT,
      distDir  = CONST_DIST_PATH,
      env      = CONST_ENV || 'develop',
    } = args;

    console.log('mode:dev');

    wpInstance({
      port,
      env,
      distDir,
      sourceWorkDir,
    });
}


exports.buildActivity = ( sourceWorkDir, args) => {
  const {
    distDir  = CONST_DIST_PATH,
    env      = CONST_ENV,
  } = args;

  console.log('mode:build');

  console.log(distDir, env);
}