"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xrosyrc = exports.getWorkspace = exports.pathExists = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var pathExists = function pathExists(strPath) {
  return _fs["default"].existsSync(strPath);
};

exports.pathExists = pathExists;

var _readYamlConfig = function _readYamlConfig(targetPath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';
  var userConf;
  userConf = {};

  try {
    userConf = _nodeYaml["default"].readSync(targetPath, {
      encoding: encoding
    });
  } catch (e) {
    console.error(e);
  }

  return userConf;
};

var _findUserProfile = function _findUserProfile(workspace) {
  var supporter = ['.xrosyrc', '.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc.json'];
  return supporter.find(function (item) {
    return _fs["default"].existsSync(_path["default"].join(workspace, item));
  });
};

var getWorkspace = function getWorkspace(dir) {
  return _path["default"].resolve(dir);
};

exports.getWorkspace = getWorkspace;

var xrosyrc = function xrosyrc(workspace) {
  var profileName = _findUserProfile(workspace);

  if (typeof profileName !== 'string') return {};

  var profilePath = _path["default"].join(workspace, profileName);

  switch (profileName) {
    default:
      return _readYamlConfig(profilePath);
  }
};

exports.xrosyrc = xrosyrc;