const {
  CONST_DEV_PORT,
  CONST_DIST_PATH,
  CONST_ENV
} = require('../defConf.js');


module.exports = (projectPath, args)=>{
  const {
      port     = CONST_PORT,
      distDir  = CONST_DIST_PATH,
      env      = CONST_ENV,
    } = args;


  console.log(port, distDir, env);
}