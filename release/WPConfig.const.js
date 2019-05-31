"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONST_SS = exports.CONST_ENTRY_MAIN = exports.DEFAULT_DIST_PATH = exports.DEFAULT_SERVICE_PORT = exports.DEFAULT_ENV = void 0;
var DEFAULT_ENV = process.env.XROSY_ENV || process.env.NODE_ENV || 'develop';
exports.DEFAULT_ENV = DEFAULT_ENV;
var DEFAULT_SERVICE_PORT = 3000;
exports.DEFAULT_SERVICE_PORT = DEFAULT_SERVICE_PORT;
var DEFAULT_DIST_PATH = 'dist';
exports.DEFAULT_DIST_PATH = DEFAULT_DIST_PATH;
var CONST_ENTRY_MAIN = ['app.jsx', 'app.js', 'main.jsx', 'main.js', 'index.jsx', 'index.js'];
exports.CONST_ENTRY_MAIN = CONST_ENTRY_MAIN;
var CONST_SS = {};
exports.CONST_SS = CONST_SS;