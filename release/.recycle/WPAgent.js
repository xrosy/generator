"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildActivity=exports.devActivity=void 0;var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread")),_path=_interopRequireDefault(require("path")),_webpack=_interopRequireDefault(require("webpack")),_cleanWebpackPlugin=_interopRequireDefault(require("clean-webpack-plugin")),_htmlWebpackPlugin=_interopRequireDefault(require("html-webpack-plugin")),_server=_interopRequireDefault(require("./server.js")),_WPConfig=_interopRequireDefault(require("./WPConfig.js")),wpAgent=function wpAgent(a){var b=a.workspace,c=void 0===b?".":b,d=a.port,e=a.env,f=a.distDir,g=new _WPConfig["default"](c);// const wpWorkspace = utils.getWorkspace(workspace);
// const userConf = utils.xrosyrc(wpWorkspace);
// const wpOutputPath = path.join(wpWorkspace, './build');
// const wpConfig = {
//   context : wpWorkspace,
//   mode : 'none',
//   devtool : 'eval-source-map',
//   entry : {
//     admin : [
//       'webpack-hot-middleware/client',
//       './src/admin/index.js',
//     ],
//   },
//   output : {
//     path      : wpOutputPath,
//     filename  : '[name].js',
//     publicPath: '/',
//     pathinfo  : false,
//   },
//   resolve : {
//     /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
//     alias           : {},
//     extensions      : [ '.js', '.jsx' ],
//     enforceExtension: false,
//     /* 对模块是否需要使用的扩展 */
//     enforceModuleExtension : false,
//     // modules: [ path.join(wpWorkspace, 'node_modules') ],
//   },
//   module : {
//     rules : [
//       {
//         test   : /\.(js|jsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         use    : { loader: 'babel-loader', options: { presets: [ '@babel/preset-env', '@babel/preset-react' ]}},
//       },
//     ],
//   },
//   plugins : [
//     new CleanWebpackPlugin({ dry: false, verbose: false }),
//     new webpack.DefinePlugin({ env: JSON.stringify(process.env.NODE_ENV || 'dev') }),
//     // new webpack.ProgressPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin(),
//     new HtmlWebpackPlugin({
//       chunks : [ 'library', 'utils', 'admin' ],
//     }),
//   ],
//   optimization : {
//     minimize   : true,
//     splitChunks: {
//       cacheGroups : {
//         libs : {
//           name    : 'library',
//           test    : /node_modules/,
//           chunks  : 'initial',
//           // 打包后的文件名，任意命名
//           // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
//           priority: 10,
//         },
//         utils : {
//           name   : 'utils',
//           chunks : 'initial',
//           // 只要超出0字节就生成一个新包
//           minSize: 0,
//         },
//       },
//     },
//   },
// };
// return webpack(wpConfig);
},devActivity=function devActivity(a,b){new _WPConfig["default"]((0,_objectSpread2["default"])({},b,{workspace:a}))};exports.devActivity=devActivity;/*  */var buildActivity=function buildActivity(a,b){new _WPConfig["default"]((0,_objectSpread2["default"])({},b,{workspace:a}))};exports.buildActivity=buildActivity;