
import path from 'path';

import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';

import { logger as console } from '../utils.js';
import { CONST_PRODUCTION, SERVER_PORT } from '../constant.js';


export default ({
  wpCompiler = null,
  // xrosy server --mode=<develop|production>
  mode = CONST_PRODUCTION,
  // xrosy server --env=<env>
  env = '',
  // xrosy server --port=<port>
  port = SERVER_PORT,
  // xrosy server --api-server=<url string>
  isService = true,
  apiServer = null,
}) => {
  const isProduction = mode === CONST_PRODUCTION;
  const rootPath = isProduction ? wpCompiler.options.output.path : wpCompiler.options.output.publicPath;
  const server = express();

  server.engine('html', require('express-art-template'));
  server.set('view engine', 'html');
  server.set('views', rootPath);

  console.log('mode        :', mode);
  console.log('isService   :', isService);
  console.log('isProduction:', isProduction);


  if (isService === false && isProduction === true) {
    wpCompiler.run((err, stats) => {
      const { startTime, endTime } = stats;
      console.success(`Time     : ${(endTime - startTime) / 1000} 秒`);
      console.success('Successful！');
    });
  }
  else if (isProduction === false) {
    server.use(wpDevMiddleware(wpCompiler, {
      publicPath : rootPath,
      noInfo     : false,
      writeToDisk: false,
      headers    : { 'X-Custom-Header': 'yes' },
      logLevel   : 'warn',
      // watchOptions: {},
    }));

    server.use(wpHotMiddleware(wpCompiler));
  }

  server.use(express.static(rootPath));

  server.use(proxy({
    target     : `http://127.0.0.1:${port}`,
    pathRewrite: { '^/.*': '/index.html' },
  }));

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
