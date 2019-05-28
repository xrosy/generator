import express from 'express';
import wpDevMiddleware from 'webpack-dev-middleware';
import wpHotMiddleware from 'webpack-hot-middleware';

import { DEFAULT_PORT } from './defConf.js';

export default wpCompiler => {
  const server = express();

  console.log(wpCompiler);

  server.use(wpDevMiddleware(wpCompiler, {
    publicPath: wpCompiler.options.publicPath,
    headers   : { 'X-Custom-Header': 'yes' },
    logLevel  : 'error',
  }));

  server.use(wpHotMiddleware(wpCompiler, {
    noInfo : true,
  }));

  server.listen(DEFAULT_PORT, err => {
    if (err) return console.log(err);

    console.info('Listening on port 3000. Open up http://0.0.0.0:3000/ in your browser.');
  });
};
