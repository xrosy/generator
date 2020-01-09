import path from 'path';

import express from 'express';

import { logger as console } from '../utils.js';


export default () => {
  const server = express.Router();

  server.use('/favicon.ico', (req, res) => {
    res.status(404).send('Sorry cant find it!');
  });

  server.use((req, res, next) => {
    console.log('req.originalUrl1', req.originalUrl);

    req.originalUrl = 'sss';
    next();
  });

  server.use((req, res, next) => {
    console.log('req.originalUrl2', req.originalUrl);

    next();
  });


  server.use(express.static(path.join(__dirname, '../../static'), {
    dotfiles  : 'ignore',
    etag      : true,
    extensions: [ 'html', 'htm' ],
    maxAge    : '1d',
    redirect  : false,
    setHeaders (res) {
      res.set('X-Timestamp', Date.now());
    },
  }));

  return server;
};
