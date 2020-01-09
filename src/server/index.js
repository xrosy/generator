
import path from 'path';

import express from 'express';
import morgan from 'morgan';

import { logger as console } from '../utils.js';
import { SERVER_PORT } from '../constant.js';

import prdServer from './server.prd';
import devServer from './server.dev';


export default ({
  // xrosy server --mode=<develop|production>
  mode = 'develop',
  // xrosy server --env=<env>
  env,
  // xrosy server --port=<port>
  port,
  // xrosy server --api-server=<url string>
  apiServer = null,
}) => {
  const server = express();

  server.engine('html', require('express-art-template'));
  server.set('view engine', 'html');

  console.log(mode);

  if (mode.toLowerCase() === 'prd' || mode.toLowerCase() === 'production') {
    server.use(prdServer());
  }
  else {
    server.use(devServer());
  }


  // server.use(express.static('', ));

  server.use(function(req, res) {
    res.status(404).render(path.join(__dirname, './404.html'));
  });

  server.disable('x-powered-by');
  server.enable('trust proxy');


  server.listen(port, (err) => {
    if (err) return console.log(err);

    console.primary(`Listening on port \`${port}\`. Open up http://127.0.0.1:${port}/ in your browser.`);
  });
};
