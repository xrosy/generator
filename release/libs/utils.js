"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileReader = void 0;

exports.typeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

var fileReader = function fileReader() {};

exports.fileReader = fileReader;