
import path from 'path';

import express from 'express';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';

import { logger as console } from '../utils.js';
import {
  CONST_DEVELOPMENT,
  CONST_PRODUCTION,
  SERVER_PORT
} from '../constant.js';

import prdServer from './server.prd';
import devServer from './server.dev';


export default ({
  wpCompiler = null,
  // xrosy server --mode=<develop|production>
  mode = CONST_PRODUCTION,
  // xrosy server --env=<env>
  env,
  // xrosy server --port=<port>
  port = SERVER_PORT,
  // xrosy server --api-server=<url string>
  apiServer = null,
}) => {
  const modex = mode === CONST_PRODUCTION ? CONST_PRODUCTION : CONST_DEVELOPMENT;

  if (modex.toLowerCase() === CONST_DEVELOPMENT) {
    // server.use(devServer());
  }
  else {
    wpCompiler.run((err, stats) => {
      const { startTime, endTime } = stats;
      console.success(`Time     : ${(endTime - startTime) / 1000} 秒`);
    });

    const server = express();

    server.engine('html', require('express-art-template'));
    server.set('view engine', 'html');

    // server.use(express.static('', ));

    server.use(function(req, res) {
      res.status(404).render(path.join(__dirname, '../../404.html'));
    });

    server.disable('x-powered-by');
    server.enable('trust proxy');

    server.listen(port, (e) => {
      if (e) return console.log(e);

      console.primary(`Listening on port \`${port}\`. Open up http://127.0.0.1:${port}/ in your browser.`);
    });
    // server.use(prdServer());
  }
};
