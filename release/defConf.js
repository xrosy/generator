"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_DIST_PATH = exports.DEFAULT_SERVICE_PORT = exports.DEFAULT_ENV = void 0;
var DEFAULT_ENV = process.env.XROSY_ENV || process.env.NODE_ENV || 'develop';
exports.DEFAULT_ENV = DEFAULT_ENV;
var DEFAULT_SERVICE_PORT = 3000;
exports.DEFAULT_SERVICE_PORT = DEFAULT_SERVICE_PORT;
var DEFAULT_DIST_PATH = 'dist';
exports.DEFAULT_DIST_PATH = DEFAULT_DIST_PATH;