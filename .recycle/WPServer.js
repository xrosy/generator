import path from 'path';
import fs from 'fs';

import express from 'express';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import httpProxy from 'http-proxy-middleware';

// import proxy from 'http-proxy-middleware';
// import cons from 'consolidate';

import { logger } from './utils.js.js';
// import { DEFAULT_SERVICE_PORT } from './constant';
// import router from './WPServer.router';

const app = express();


export default (wpCompiler, serverport) => {
  const {
    options: {
      output: {
        path: opPath,
        publicPath: opPublicPath,
      } = {},
    } = {},
  } = wpCompiler;

  app.engine('html', require('express-art-template'));
  app.set('view engine', 'html');
  app.set('views', opPath);

  const wpDevMiddlewareConf = {
    publicPath : opPublicPath,
    noInfo     : false,
    writeToDisk: false,
    headers    : { 'X-Custom-Header': 'yes' },
    logLevel   : 'warn',
  };

  // app.use('/gmall', router);
  app.use('/favicon.ico', (req, res) => {
    res.status(404).send('Sorry cant find that!');
  });

  app.use(wpDevMiddleware(wpCompiler, wpDevMiddlewareConf));

  app.use(wpHotMiddleware(wpCompiler));

  app.use(express.static(opPath));

  app.use(httpProxy({
    target     : `http://localhost:${serverport}`,
    pathRewrite: {
      '^/.*' : '/index.html',
    },
  }));

  app.use(function(req, res) {
    res.status(404).send('404!');
  });

  app.listen(serverport, err => {
    if (err) return logger.log(err);

    logger.primary(`Listening on port :${serverport}. Open up http://localhost:${serverport}/ in your browser.`);
  });
};
