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
  const _CONFIGS_ = wpConf({projectDir: sourceWorkDir});

  console.log(_CONFIGS_);

  // const wpCompiler = webpack(_CONFIGS_);
  // wpCompiler.run((err, stats)=>{});

  /* Webpack configs */
  // const wpCompiler = webpack({
  //   context: conf.getProjectContext(),
  //   entry: './app.js',
  //   output: {
  //     filename: "bundle.js",
  //     path: path.resolve(conf.getProjectContext(), 'dist'),
  //   },

  //   resolve: {
  //     extensions: conf.getExtensions()
  //   },

  //   module: {
  //     rules: conf.getLoaders(),
  //   }
  // });

  // /* ------------------------ */
  // wpCompiler.run((err, stats)=>{
  //   // console.log('ERR:', err);
  //   // console.log('stats:', stats);
  // });
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