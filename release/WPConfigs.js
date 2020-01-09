"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=BuiltIn;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_objectWithoutProperties2=_interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties")),_path=_interopRequireDefault(require("path")),_nodeYaml=require("node-yaml"),_webpack=_interopRequireDefault(require("webpack")),_htmlWebpackPlugin=_interopRequireDefault(require("html-webpack-plugin")),_miniCssExtractPlugin=_interopRequireDefault(require("mini-css-extract-plugin")),_cleanWebpackPlugin=_interopRequireDefault(require("clean-webpack-plugin")),_constant=require("./constant"),utils=_interopRequireWildcard(require("./utils.js")),_WPServer=_interopRequireDefault(require("./WPServer.js"));function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}var console=utils.logger,DEVELOPER_DEBUGGER="webpack-hot-middleware/client?noInfo=true&reload=true",CUSTOM_FILENAME=".xrosyrc",BROWSERS=["last 3 versions","ie >= 9","ie_mob >= 10","ff >= 30","chrome >= 34","safari >= 6","opera >= 12.1","ios >= 6","android >= 4.4","bb >= 10","and_uc 9.9"];function BuiltIn(a){var b=a.workspace,c=void 0===b?".":b,d=a.env,e=a.mode,f=a.description,g=a.serverport,h=a.version,i=_path["default"].resolve(c),j=(0,_nodeYaml.readSync)(_path["default"].join(i,CUSTOM_FILENAME)),k=j.apps,l=j.alias,m=void 0===l?{}:l,n=(0,_objectWithoutProperties2["default"])(j,["apps","alias"]),o="dev"===e?_constant.MODE_DEVELOPMENT:_constant.MODE_PRODUCTION,p=o===_constant.MODE_DEVELOPMENT,q={loader:_miniCssExtractPlugin["default"].loader,options:{reloadAll:!1,publicPath:"../",hmr:o===_constant.MODE_DEVELOPMENT}};Object.keys(_objectSpread({},m)).forEach(function(a){m[a]=_path["default"].join(i,m[a])});var r=new// mode = 'development'; // "development" | "production" | "none"
function WPConfig(){(0,_classCallCheck2["default"])(this,WPConfig),this.bail=!0,this.context=function(){return i}(),this.entry=function(){var a=_path["default"].join(i,"src/app","index.jsx");return p?[DEVELOPER_DEBUGGER,a]:a}(),this.mode=o,this.target="web",this.devtool="cheap-module-eval-source-map",this.resolve={mainFiles:["index","main"],extensions:[".jsx",".js",".json"],modules:[_path["default"].resolve(i,"src/library"),"node_modules"],alias:_objectSpread({src:_path["default"].join(i,"src"),"@env":_path["default"].join(i,"src/env"),"@utils":_path["default"].join(i,"src/utils")},_objectSpread({},m))},this.module={rules:[{test:/\.jsx?$/,use:{loader:"babel-loader",options:{cacheDirectory:!0,presets:[["@babel/preset-env",{/* 将此参数设置为false,既将module交由webpack处理，而不是babel */modules:"auto",// 'commonjs', 'amd', 'umd', 'systemjs', 'auto'
useBuiltIns:"usage",corejs:"3.4.7",// shippedProposals: true,
targets:{browsers:BROWSERS}}],["@babel/preset-react",{}]],plugins:["@babel/plugin-proposal-class-properties",["@babel/plugin-transform-runtime",{corejs:3,helpers:!0}]]}},// include : path.join(absWorkspace, 'src'),
exclude:/(node_modules|bower_components)/},{test:/\.s?css$/,use:[q,{loader:"css-loader",options:{importLoaders:1}},{loader:"sass-loader",options:{}}]},{test:/\.less$/,use:[q,{loader:"css-loader",options:{importLoaders:1}},{loader:"less-loader"}]},{test:/\.(jpg|png|gif|bmp|jpeg)$/,use:[{loader:"url-loader",options:{esModule:!1,limit:8192,publicPath:"../",name:"images/[hash:16].[ext]"}}]},{test:/\.svg/,use:[{loader:"url-loader",options:{esModule:!1,limit:10,publicPath:"../",name:"images/[hash:16].[ext]"}}]}]},this.performance=function(){// return { hints: 'warning' };
}(),this.optimization={minimize:!1,namedChunks:!0,runtimeChunk:"single",// 'multiple'
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
}}},this.plugins=[new _webpack["default"].DefinePlugin({env:JSON.stringify("dev"),"service.env":JSON.stringify("dev"),"process.env.NODE_ENV":JSON.stringify("dev")}),new _miniCssExtractPlugin["default"]({filename:"styles/[name].css"}),// new I18nPlugin(languageConfig, optionsObj),
new _webpack["default"].optimize.LimitChunkCountPlugin({maxChunks:5}),new _htmlWebpackPlugin["default"]({chunks:["runtime","framework.depend","framework.commons","main"],template:_path["default"].join(__dirname,"../view.art"),// eslint-disable-next-line babel/camelcase
templateParameters:{compile_date:new Date().toLocaleString("zh",{hour12:!1})},filename:"index.html",hash:!1,meta:{viewport:"width=device-width, initial-scale=1, user-scalable=no"},minify:{collapseWhitespace:!0,removeComments:!1,removeRedundantAttributes:!0,removeScriptTypeAttributes:!0,removeStyleLinkTypeAttributes:!0,useShortDoctype:!0}})],this.output=function(){var a=n.output||{path:"dist"};return"string"==typeof a&&(a={path:a}),_objectSpread({hashSalt:"Oulate X",publicPath:""},a,{// path         : builtMode === MODE_DEVELOPMENT ? '/var/tmp/@xrosy/generator' : path.join(absWorkspace, userOutput.path),
path:_path["default"].join(i,a.path),filename:"js/[name].js",chunkFilename:"js/[name].js"})}(),this.optimization.noEmitOnErrors=!0,o===_constant.MODE_DEVELOPMENT&&(this.plugins.unshift(new _cleanWebpackPlugin["default"]({cleanStaleWebpackAssets:!0,cleanOnceBeforeBuildPatterns:[this.output.path]})),this.plugins.push(new _webpack["default"].optimize.OccurrenceOrderPlugin,new _webpack["default"].HotModuleReplacementPlugin,new _webpack["default"].NoEmitOnErrorsPlugin))}/*
    initEntries() {
      const userApps = apps;
      const isDevelopment = builtMode === MODE_DEVELOPMENT;

      Object.keys(userApps).forEach((name) => {
        const basic = path.join(absWorkspace, 'src', 'apps', userApps[name]);
        const templateEntry = path.join(basic, 'main.js');
        const templateViewer = utils.exists(path.join(basic, 'main.html')) ? path.join(basic, 'main.html') : path.join(__dirname, '../view.art');

        this.entry[name] = isDevelopment ? [ 'webpack-hot-middleware/client?noInfo=true&reload=true', templateEntry ] : templateEntry;

        this.plugins = this.plugins || [];

        this.plugins.push(
          new HtmlWebpackPlugin({
            chunks            : [ 'runtime', 'framework.depend', 'framework.commons', name ],
            template          : templateViewer,
            // eslint-disable-next-line babel/camelcase
            templateParameters: { compile_date: (new Date()).toLocaleString('zh', { hour12: false }) },
            filename          : `${name}.html`,
            hash              : false,
            meta              : {
              viewport : 'width=device-width, initial-scale=1, user-scalable=no',
            },
            minify : {
              collapseWhitespace           : true,
              removeComments               : false,
              removeRedundantAttributes    : true,
              removeScriptTypeAttributes   : true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype              : true,
            },
          })
        );
      });
    }
    */;// develop service
return o===_constant.MODE_DEVELOPMENT?(0,_WPServer["default"])((0,_webpack["default"])(_objectSpread({},r,{output:_objectSpread({},r.output,{publicPath:"/"})})),g):void// build
(0,_webpack["default"])(r).run(function(){// const { errors } = stats.toJson();
// console.primary('耗时:', (+stats.endTime - +stats.startTime) / 1000, '秒');
})}