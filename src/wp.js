const webpack = require('webpack');
const {
  CONST_PORT,
  CONST_DIST_PATH,
  CONST_ENV
} = require('./defConf.js');

exports.devActivity = (projectPath, args)=>{

  const {
      port     = CONST_PORT,
      distDir  = CONST_DIST_PATH,
      env      = CONST_ENV,
    } = args;

    console.log('mode:dev');

    webpack({

    });
}