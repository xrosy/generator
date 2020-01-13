
import path from 'path';

import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';

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
  const isDevelopment = mode === CONST_DEVELOPMENT;

  const rootPath = isDevelopment ? wpCompiler.options.output.publicPath : wpCompiler.options.output.path;

  const server = express();

  server.engine('html', require('express-art-template'));
  server.set('view engine', 'html');
  server.set('views', rootPath);

  if (isDevelopment === !0) {
    server.use(wpDevMiddleware(wpCompiler, {
      publicPath : rootPath,
      noInfo     : false,
      writeToDisk: false,
      headers    : { 'X-Custom-Header': 'yes' },
      logLevel   : 'warn',
      // watchOptions: {},
    }));

    server.use(wpHotMiddleware(wpCompiler));

    server.use(express.static(rootPath));

    server.use(proxy({
      target     : `http://127.0.0.1:${port}`,
      pathRewrite: { '^/.*': '/index.html' },
    }));
  }
  else {
    server.use(express.static(rootPath));

    server.use(proxy({
      target     : `http://127.0.0.1:${port}`,
      pathRewrite: { '^/.*': '/index.html' },
    }));

    /*
    server.use(history({
      logger  : console.debug,
      index   : 'index.html',
      rewrites: [
        { form: /^\/, to: '/' }
      ],
    }));
    */

    wpCompiler.run((err, stats) => {
      const { startTime, endTime } = stats;
      console.success(`Time     : ${(endTime - startTime) / 1000} 秒`);
      console.success('Successful！');
    });

    // server.use(prdServer());
  }

  /*
  server.use('/favicon.ico', (req, res) => {
    res.status(404).send('Sorry cant find that!');
  });
  */

  server.use(function(req, res) {
    res.status(404).render(path.join(__dirname, '../../404.html'));
  });


  server.disable('x-powered-by');
  server.enable('trust proxy');
  server.listen(port, (e) => {
    if (e) return console.log(e);

    console.primary(`Listening on port \`${port}\`. Open up http://127.0.0.1:${port}/ in your browser.`);
  });
};
