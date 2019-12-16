"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildActivity=exports.initActivity=void 0;var _objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties")),_path=_interopRequireDefault(require("path")),_fs=_interopRequireDefault(require("fs")),utils=_interopRequireWildcard(require("./utils.js")),_WPConfigs=_interopRequireDefault(require("./WPConfigs.js")),cat=utils.logger,PRO_DIRECTORY_LIST=["library","documents","static","src","src/apps","src/configs","src/server","src/utils","test"],initActivity=function initActivity(a,b){var c=b.parent._version,d=b.force,e=void 0!==d&&d,f=b.recursive,g=void 0===f||f,h=utils.getResourceAbsolutePath(),i=_path["default"].resolve(".",a);/** 复制必要文件到项目目录下 */if(cat.info("Oulate version: ",utils.PKG_VERSION),_fs["default"].mkdirSync(i,{recursive:!0===g}),cat.info("\u5DE5\u7A0B\uFF1A",i),PRO_DIRECTORY_LIST.forEach(function(b){utils.mkdirSync(_path["default"].resolve(".",a,b),{force:!0===e,recursive:!0===g}),cat.success("\u521B\u5EFA\uFF1A",_path["default"].join(a,b))}),!1===utils.exists(h))throw Error("Missing: Can't not found ".concat(h));_fs["default"].readdirSync(h).forEach(function(b){var c=_path["default"].join(h,b),d=_path["default"].join(i,b);try{_fs["default"].copyFileSync(c,d,+!e),cat.success("\u521B\u5EFA\uFF1A",_path["default"].join(a,b))}catch(c){cat.error("\u5931\u8D25\uFF1A",_path["default"].join(a,b),"EEXIST"===(c.code+"").toUpperCase()?"\t#redBright([\u5DF2\u5B58\u5728])":"")}}),_fs["default"].writeFileSync(_path["default"].join(i,"package.json"),JSON.stringify({name:_path["default"].basename(a),version:"1.0.0",author:"ChenZhenyuan <jason@chenzhenyuan.com>",license:"MIT",main:"./release/main.js",dependencies:{"@xrosy/generator":"^".concat(utils.PKG_VERSION)},devDependencies:{eslint:"^5.16.0","eslint-config-xrosy":"^0.1.52"}},null,2))};exports.initActivity=initActivity;/* 导出 build 接口 */var buildActivity=function buildActivity(a,b){var c=b.env,d=b.serverPort,e=void 0===d?3e3:d,f=b._name,g=b._description,h=b.parent._version,i=(0,_objectWithoutProperties2["default"])(b,["env","serverPort","_name","_description","parent"]);// return console.log(args);
cat.clear(),cat.debug(utils.PKG_NAME,"v".concat(h)),cat.debug("mode:",f,"(".concat(g,")")),(0,_WPConfigs["default"])({workspace:a,env:c,mode:f,description:g,version:h,serverport:e})};exports.buildActivity=buildActivity;