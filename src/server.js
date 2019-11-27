import express from 'express';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';

import { DEFAULT_SERVICE_PORT } from './WPConst.js';

export default (wpCompiler) => {
  console.log(wpCompiler);

  const server = express();

  server.use(
    wpDevMiddleware(wpCompiler, {
      publicPath: wpCompiler.options.publicPath,
      headers   : { 'X-Custom-Header': 'yes' },
      logLevel  : 'error',
    })
  );

  server.use(
    wpHotMiddleware(wpCompiler, {
      noInfo : true,
    })
  );

  server.listen(DEFAULT_SERVICE_PORT, err => {
    if (err) return console.log(err);

    console.info(`Listening on port 3000. Open up http://0.0.0.0:${DEFAULT_SERVICE_PORT}/ in your browser.`);
  });
};
