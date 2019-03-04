const path    = require('path');
const webpack = require('webpack');
const utils   = require('./utils');
const {
  CONST_PORT,
  CONST_DIST_PATH,
  CONST_ENV
} = require('./defConf.js');

const wpInstance = ({
  port,
  env,
  distDir,
  sourceWorkDir = '.'
}) => {

  if (utils.typeof(sourceWorkDir) !== 'string' || sourceWorkDir === '') {
    throw Error('not setting source work directry')
  }

  /* Webpack configs */
  const wpCompiler = webpack({
    entry: "./app/entry",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    }
  });

  console.log("sourceWorkDir:", sourceWorkDir);

  /* ------------------------ */
  wpCompiler.run((err, stats)=>{
    // console.log('ERR:', err);
    // console.log('stats:', stats);
  });
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




exports.buildActivity = (
  sourceWorkDir,
  {
    distDir  = CONST_DIST_PATH,
    env      = CONST_ENV,
  }
) => {
  console.log('mode:build');

  console.log(distDir, env);
}