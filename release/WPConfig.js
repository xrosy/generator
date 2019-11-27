"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _class,_temp,_toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray")),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_applyDecoratedDescriptor2=_interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor")),_util=_interopRequireDefault(require("util")),_path=_interopRequireDefault(require("path")),_fs=_interopRequireDefault(require("fs")),_nodeYaml=_interopRequireDefault(require("node-yaml")),_webpack=_interopRequireDefault(require("webpack")),_cleanWebpackPlugin=_interopRequireDefault(require("clean-webpack-plugin")),_htmlWebpackPlugin=_interopRequireDefault(require("html-webpack-plugin")),_WPConst=require("./WPConst.js"),_server=_interopRequireDefault(require("./server.js"));function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}var SYM_ARGS=Symbol["for"]("argv"),SYM_PROFILE_CONFIGS=Symbol["for"]("profileConfigs"),SYM_HTML_WEBPACK_PLUGIN=Symbol["for"]("HtmlWebpackPlugin"),_PROFILE_SUPPORTED_LIST=[".xrosyrc",".xrosyrc.yml",".xrosyrc.yaml",".xrosyrc.json"];function logger(a,b,c){return c}function __setAttrPrivatization(a,b){Object.defineProperty(a||{},b,{writable:!0,enumerable:!1})}/** 验证文件或者目录是否存在
 *
 * @param   {string}      strPath             - the absolute path for file or directory.
 * @return  {boolean}                         - the validate result.
 */function _exists(a){return _fs["default"].existsSync(a)}/** 获取工程运行目录的绝对路径
 * @param   {string}      dirPath             - 项目相对运行位置的相对地址或者项目的绝对地址
 * @return  {string}                          - 工作目录的绝对
 */var _getWorkspaceAbs=function _getWorkspaceAbs(a){if("string"!=typeof a)throw Error("The 'workspace' must be a string.");var b=_path["default"].resolve(a);if(!_exists(b))throw Error("The workspace is not exist.");return b},_readConfigs=function _readConfigs(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"utf8",c=(a.split("/").pop()||"").toLowerCase(),d={};try{".xrosyrc.json"===c?d=require(a):".xrosyrc.yaml"===c||".xrosyrc.yml"===c||".xrosyrc"===c?d=_nodeYaml["default"].readSync(a,{encoding:b}):void 0}catch(a){throw a}return d},WPConfig=(_class=(_temp=/*#__PURE__*/function(){/* ------------------------------------ */function WPConfig(){var a=this,b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};(0,_classCallCheck2["default"])(this,WPConfig),this[SYM_PROFILE_CONFIGS]=[],this[SYM_HTML_WEBPACK_PLUGIN]=[],this.mode="none",this.devtool="eval-source-map",this.entry={},this.output={filename:"static/[name.hash:6].js",publicPath:"",pathinfo:!1},this.resolve={alias:{},extensions:[".jsx",".js"],/* 引入依赖或者文件时，强制要求添加文件的扩展名 */enforceExtension:!1,/* 对模块是否需要使用的扩展 */enforceModuleExtension:!1// modules : [ path.join(wpWorkspace, 'node_modules') ],
},this.module={rules:[{test:/\.(scss)$/,use:{loader:"scss-loader"}},{test:/\.(js|jsx)$/,use:{loader:"babel-loader",options:{presets:["@babel/preset-env","@babel/preset-react"]}},exclude:/(node_modules|bower_components)/}]},this.optimization={minimize:!0};return __setAttrPrivatization(this,SYM_ARGS),__setAttrPrivatization(this,SYM_PROFILE_CONFIGS),__setAttrPrivatization(this,SYM_HTML_WEBPACK_PLUGIN),this[SYM_ARGS]=b,this.plugins=[/** 清除缓存 */new _cleanWebpackPlugin["default"]({dry:!1,verbose:!1})].concat((0,_toConsumableArray2["default"])(this[SYM_HTML_WEBPACK_PLUGIN])),void console.log(_util["default"].inspect(this,{depth:1}))}return(0,_createClass2["default"])(WPConfig,[{key:"webpackConfigs",get:function get(){var a=this.getOutput(),b={context:this.context,output:a,entry:this.entry,resolve:this.resolve,mode:"none",devtool:"eval-source-map",module:{rules:[{test:/\.(scss)$/,use:{loader:"scss-loader"}},{test:/\.(js|jsx)$/,use:{loader:"babel-loader",options:{presets:["@babel/preset-env","@babel/preset-react"]}},exclude:/(node_modules|bower_components)/}]},optimization:{minimize:!0},plugins:[/** 清除缓存 */new _cleanWebpackPlugin["default"]({dry:!1,verbose:!1}),/** 使用进度显示 */ // new webpack.ProgressPlugin(),
/** 在编译出现错误时，跳过输出阶段  */new _webpack["default"].NoEmitOnErrorsPlugin,new _webpack["default"].HotModuleReplacementPlugin,new _htmlWebpackPlugin["default"]({chunks:["library","utils","admin"]}),new _webpack["default"].DefinePlugin({env:JSON.stringify(this.env)})]};// const entry = this.getEntries();
return b}},{key:"argv",set:function set(){},get:function get(){return this[SYM_ARGS]}},{key:"developer",get:function get(){return!0===this.argv.developer||!1}},{key:"profileConfigs",get:function get(){var a=this,b=this[SYM_PROFILE_CONFIGS];/* 判断是否已经读取过用户配置，是则返回缓存中的数据 */if("undefined"!=typeof b)return b;/* 读取用户配置信息 */var c=_PROFILE_SUPPORTED_LIST.find(function(b){var c=_path["default"].resolve(a.context,b);return _exists(c)});return c&&(b=_readConfigs(_path["default"].resolve(this.context,c))),this[SYM_PROFILE_CONFIGS]=_objectSpread({},b),this[SYM_PROFILE_CONFIGS]}},{key:"serverPort",get:function get(){return _WPConst.DEFAULT_SERVICE_PORT}/* 初始化字段 */ /* ------------------------------------ */ /* 用户配置信息缓存字段 */}]),(0,_createClass2["default"])(WPConfig,[{key:"context",get:function get(){return _getWorkspaceAbs(this.argv.workspace)}/* ------------------------------------ */}]),WPConfig}(),_temp),(0,_applyDecoratedDescriptor2["default"])(_class.prototype,"profileConfigs",[logger],Object.getOwnPropertyDescriptor(_class.prototype,"profileConfigs"),_class.prototype),_class);/** 读取用的配置文件
 */exports["default"]=WPConfig;