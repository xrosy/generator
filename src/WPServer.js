import path from 'path';
import fs from 'fs';

import express from 'express';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';

// import proxy from 'http-proxy-middleware';
// import cons from 'consolidate';

import { logger } from './utils.js';
import { DEFAULT_SERVICE_PORT } from './constant';
import router from './WPServer.router';

const app = express();


export default (wpCompiler) => {
  const {
    options: {
      output: {
        path: opPath,
        publicPath: opPublicPath,
      } = {},
    } = {},
  } = wpCompiler;

  // app.engine('html', require('express-art-template'));
  // app.set('view engine', 'html');
  // app.set('views', opPath);

  const wpDevMiddlewareConf = {
    publicPath : opPublicPath,
    noInfo     : false,
    writeToDisk: false,
    headers    : { 'X-Custom-Header': 'yes' },
    logLevel   : 'warn',
    stats      : {
      colors: true,
      chunks: false,
    },
  };

  // app.use('/gmall', router);

  app.use(wpDevMiddleware(wpCompiler, wpDevMiddlewareConf));

  app.use(wpHotMiddleware(wpCompiler));

  app.get([ '/gmall', '/gmall/*' ], (req, res, next) => {
    res.redirect('/gmall.html');
  });

  // app.get('/', (req, res) => res.redirect('defaultRedirect'));

  app.use(express.static(opPath));

  app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
  });


  app.listen(DEFAULT_SERVICE_PORT, err => {
    if (err) return logger.log(err);

    logger.primary(`Listening on port :${DEFAULT_SERVICE_PORT}. Open up http://127.0.0.1:${DEFAULT_SERVICE_PORT}/ in your browser.`);
  });
};
