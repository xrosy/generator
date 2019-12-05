import path from 'path';

import express from 'express';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';

import { DEFAULT_SERVICE_PORT } from './constant';

export default (wpCompiler) => {
  const {
    options: {
      output: { path: opPath, publicPath: opPublicPath } = {},
    } = {},
  } = wpCompiler;
  const app = express();

  // server.engine('html', ejs.renderFile);
  app.set('views', opPath);
  app.set('view engine', 'html');

  app.use(
    wpDevMiddleware(wpCompiler, {
      publicPath : opPublicPath,
      noInfo     : true,
      writeToDisk: false,
      headers    : { 'X-Custom-Header': 'yes' },
      logLevel   : 'error',
    })
  );

  app.use(
    wpHotMiddleware(wpCompiler)
  );

  app.use(express.static('.'));

  app.get('/', function(req, res) {
    res.send('hello world');
  });

  app.listen(DEFAULT_SERVICE_PORT, err => {
    if (err) return console.log(err);

    console.info(`Listening on port :3000. Open up http://0.0.0.0:${DEFAULT_SERVICE_PORT}/ in your browser.`);
  });
};
