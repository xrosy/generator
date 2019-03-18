"use strict";

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _utils = _interopRequireDefault(require("./utils.js"));

var _wpConf = _interopRequireDefault(require("../conf/wpConf.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("../defConf.js"),
    CONST_PORT = _require.CONST_PORT,
    CONST_DIST_PATH = _require.CONST_DIST_PATH,
    CONST_ENV = _require.CONST_ENV;

var wpInstance = function wpInstance(_ref) {
  var port = _ref.port,
      env = _ref.env,
      distDir = _ref.distDir,
      _ref$sourceWorkDir = _ref.sourceWorkDir,
      sourceWorkDir = _ref$sourceWorkDir === void 0 ? "." : _ref$sourceWorkDir;

  /**
   * Webpack configs
   */
  var __CONFIGS__ = (0, _wpConf.default)({
    env: env,
    port: port,
    distDir: distDir,
    projectPath: sourceWorkDir
  });

  var wpCompiler = (0, _webpack.default)(__CONFIGS__);
  var wpWatcher = wpCompiler.run(function (err, stats) {
    // const stdout = stats.toString('verbose');
    // console.log(stats.toJson('verbose'));
    var stdout = stats.toString({
      stats: {
        // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
        all: undefined,
        // 添加资源信息
        assets: true,
        // 对资源按指定的字段进行排序
        // 你可以使用 `!field` 来反转排序。
        // Some possible values: 'id' (default), 'name', 'size', 'chunks', 'failed', 'issuer'
        // For a complete list of fields see the bottom of the page
        assetsSort: "field",
        // 添加构建日期和构建时间信息
        builtAt: true,
        // 添加缓存（但未构建）模块的信息
        cached: true,
        // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        cachedAssets: true,
        // 添加 children 信息
        children: true,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: true,
        // 添加 namedChunkGroups 信息
        chunkGroups: true,
        // 将构建模块信息添加到 chunk 信息
        chunkModules: true,
        // 添加 chunk 和 chunk merge 来源的信息
        chunkOrigins: true,
        // 按指定的字段，对 chunk 进行排序
        // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
        // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
        // For a complete list of fields see the bottom of the page
        chunksSort: "field",
        // 用于缩短 request 的上下文目录
        context: "../src/",
        // `webpack --colors` 等同于
        colors: {
          green: "\x1B[32m"
        },
        // 显示每个模块到入口起点的距离(distance)
        depth: true,
        // 通过对应的 bundle 显示入口起点
        entrypoints: false,
        // 添加 --env information
        env: false,
        // 添加错误信息
        errors: true,
        // 添加错误的详细信息（就像解析日志一样）
        errorDetails: true,
        // 添加 compilation 的哈希值
        hash: true,
        // 设置要显示的模块的最大数量
        maxModules: 1,
        // 添加构建模块信息
        modules: true,
        // 按指定的字段，对模块进行排序
        // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
        // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
        // For a complete list of fields see the bottom of the page
        modulesSort: "field",
        // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
        moduleTrace: true,
        // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
        performance: true,
        // 显示模块的导出
        providedExports: false,
        // 添加 public path 的信息
        publicPath: true,
        // 添加模块被引入的原因
        reasons: true,
        // 添加模块的源码
        source: true,
        // 添加时间信息
        timings: false,
        // 显示哪个模块导出被用到
        usedExports: true,
        // 添加 webpack 版本信息
        version: false
      }
    });
    process.stdout.write(stdout);
  });
};
/*  */


exports.buildActivity = function (sourceWorkDir, arws) {};
/*  */


exports.devActivity = function (sourceWorkDir, args) {
  var env = args.env,
      _args$port = args.port,
      port = _args$port === void 0 ? CONST_PORT : _args$port;
  wpInstance({
    sourceWorkDir: sourceWorkDir,
    port: port,
    env: env
  });
};