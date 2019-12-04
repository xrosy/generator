"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=BuiltIn;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties")),_path=_interopRequireDefault(require("path")),_nodeYaml=require("node-yaml"),_webpack=_interopRequireDefault(require("webpack")),_htmlWebpackPlugin=_interopRequireDefault(require("html-webpack-plugin")),_miniCssExtractPlugin=_interopRequireDefault(require("mini-css-extract-plugin")),utils=_interopRequireWildcard(require("./utils.js"));function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}var console=utils.logger,CUSTOM_FILENAME=".xrosyrc";function BuiltIn(a){var b=a.workspace,c=void 0===b?".":b,d=_path["default"].resolve(c),e=(0,_nodeYaml.readSync)(_path["default"].join(d,CUSTOM_FILENAME)),f=e.apps,g=(0,_objectWithoutProperties2["default"])(e,["apps"]),h=/*#__PURE__*/function(){// "development" | "production" | "none"
function WPConfig(){(0,_classCallCheck2["default"])(this,WPConfig),this.bail=!0,this.mode="development",this.target="web",this.devtool="cheap-module-eval-source-map",this.resolve={mainFiles:["index","main"],extensions:[".js",".jsx",".json"],modules:[_path["default"].resolve(d,"src/library"),"node_modules"],alias:{"@utils":_path["default"].join(d,"src/utils"),"@env":_path["default"].join(d,"src/env")}},this.module={rules:[{test:/\.jsx?$/,use:{loader:"babel-loader",options:{cacheDirectory:!0,presets:["@babel/preset-env","@babel/preset-react"],plugins:["@babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]}},include:_path["default"].join(d,"src")// exclude : /(node_modules|bower_components)/,
},{test:/\.s?css$/,use:[{loader:_miniCssExtractPlugin["default"].loader,options:{// reloadAll : true,
// publicPath: '../',
// hmr       : process.env.NODE_ENV === 'development',
}},{loader:"css-loader",options:{importLoaders:1}},{loader:"sass-loader",options:{}}]},{test:/\.less$/,use:[{loader:_miniCssExtractPlugin["default"].loader,options:{reloadAll:!0}},{loader:"css-loader",options:{importLoaders:1}},{loader:"less-loader"}]},{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:[{loader:"url-loader",options:{esModule:!1,limit:8192,publicPath:"../../",name:"static/images/[name].[ext]"}}]}]},this.optimization={minimize:!0,namedChunks:!0,runtimeChunk:"single",// 'multiple'
removeEmptyChunks:!0,splitChunks:{// 静态资源缓存
// test, priority and reuseExistingChunk can only be configured on cache group level.
cacheGroups:{// 提取 node_modules 里面依赖的代码
"framework.depend":{name:"framework.depend",// filename : 'framework/[name].[contenthash:6].js',
test:/[\\/]node_modules[\\/]/,chunks:"all",minChunks:2,// 2个共享以及以上都提取
minSize:0,priority:-10// 优先级
},// 提出每个模块公共的代码
"framework.commons":(0,_defineProperty2["default"])({name:"framework.commons",// filename          : 'framework/[name].[contenthash:6].js',
enforce:!0,test:/\.js$/,chunks:"initial",minChunks:2,// 两个共享以及以上都提取,
minSize:0,priority:-20,// 优先级
reuseExistingChunk:!0},"enforce",!0)// css : {
//   name              : 'styles',
//   test              : /\.css$/,
//   minChunks         : 1,
//   minSize           : 0,
//   priority          : -20,
//   // chunks            : 'initial',
//   chunks            : 'all',
//   reuseExistingChunk: true,
//   enforce           : true,
// },
}}},this.plugins=[new _webpack["default"].DefinePlugin({env:JSON.stringify("dev"),"service.env":JSON.stringify("dev"),"process.env.NODE_ENV":JSON.stringify("dev")}),new _miniCssExtractPlugin["default"]({filename:"static/styles/[name].[hash:6].css"}),// new I18nPlugin(languageConfig, optionsObj),
new _webpack["default"].optimize.LimitChunkCountPlugin({maxChunks:5})// new webpack.optimize.OccurrenceOrderPlugin(),
// new webpack.HotModuleReplacementPlugin(),
// new webpack.NoEmitOnErrorsPlugin(),
],this.context=function(){return d}(),this.entry={},this.output=function(){var a=g.output||{path:"dist"};return"string"==typeof a&&(a={path:a}),_objectSpread({hashSalt:"Oulate X",publicPath:""},a,{path:_path["default"].join(d,a.path),filename:"static/js/[name].[chunkhash:6].js",chunkFilename:"static/js/[name].[chunkhash:6].js"})}(),this.optimization.noEmitOnErrors=!0,this.initEntries()}return(0,_createClass2["default"])(WPConfig,[{key:"initEntries",value:function initEntries(){var a=this,b=f;Object.keys(b).forEach(function(c){var e=_path["default"].join(d,"src","apps",b[c]);a.entry[c]=_path["default"].join(e,"main.js"),a.plugins=a.plugins||[],a.plugins.push(new _htmlWebpackPlugin["default"]({chunks:["runtime","framework.depend","framework.commons",c],template:_path["default"].join(e,"main.html"),filename:"".concat(c,".html"),hash:!1,// eslint-disable-next-line babel/camelcase
templateParameters:{compile_date:new Date().toLocaleString("zh",{hour12:!1})},minify:{collapseWhitespace:!0,removeComments:!1,removeRedundantAttributes:!0,removeScriptTypeAttributes:!0,removeStyleLinkTypeAttributes:!0,useShortDoctype:!0}}))})}}]),WPConfig}();(0,_webpack["default"])(new h).run(function(){// const { errors } = stats.toJson();
// console.warn(errors.toString());
// cat.error(stats);
// cat.error(Object.keys(stats.compilation));
})}