"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.initActivity=void 0;var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties")),_path=_interopRequireDefault(require("path")),_fs=_interopRequireDefault(require("fs")),_cat=_interopRequireDefault(require("@xrosy/cat")),initActivity=function initActivity(a,b){var c=b.force,d=(0,_objectWithoutProperties2["default"])(b,["force"]),e=_path["default"].resolve(".",a),f=_path["default"].join(__dirname,"../resource");_cat["default"].info("\u9879\u76EE:",e),_cat["default"].clear("\u9879\u76EE:",e);(function mkdir(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return Promise.all(Array.from(b).map(function(a){var b=_path["default"].join(e,a);return new Promise(function(a,c){_fs["default"].mkdir(b,{recursive:!0},function(d){return d?c(d):void a(b)})})}))})("documents","test","static","src","src/apps","src/configs","src/server","src/utils").then(function(){return new Promise(function(a,b){if(!1===utils._exists(f))throw Error("Missing: Can't not found ".concat(f));_fs["default"].readdir(f,function(c,d){return c?b(c):void a(d)})})}).then(function(a){if(!1===Array.isArray(a)||0===a.length)return[];var b=a.map(function(a){return _path["default"].join(f,a)}),c=b.map(function(a){var b=_path["default"].basename(a);return new Promise(function(c,d){var f=_path["default"].join(e,b);_fs["default"].copyFile(a,f,function(a){return a?d(a):void(c(),_cat["default"].success("\u521B\u5EFA:",f))})})});return Promise.all(c)}).then(function(){var a=_path["default"].join(e,"package.json"),b=_path["default"].basename(e);_fs["default"].writeFileSync(a,JSON.stringify({name:b,version:"0.1.0",license:"MIT",scripts:{dev:"npx xrosy dev ."},dependencies:{"@xrosy/generator":"^0.1.0"}},null,2))}).then(function(){// - 初始化项目
})};exports.initActivity=initActivity;