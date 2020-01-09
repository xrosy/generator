import path from 'path';

import express from 'express';
import proxy from 'http-proxy-middleware';

import { logger as console } from '../utils.js';


export default () => {
  const server = express.Router();

  server.use('*', express.static(path.join(__dirname, '../../static')));

  return server;
};
