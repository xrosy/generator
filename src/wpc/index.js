

export const optimization = {
  minimize         : false,
  namedChunks      : true,
  runtimeChunk     : 'single', // 'multiple'
  removeEmptyChunks: true,
  splitChunks      : {
    // 静态资源缓存
    // test, priority and reuseExistingChunk can only be configured on cache group level.
    cacheGroups : {
      // 提取 node_modules 里面依赖的代码
      'framework.depend' : {
        name     : 'framework.depend',
        // filename : 'framework/[name].[contenthash:6].js',
        test     : /[\\/]node_modules[\\/]/,
        chunks   : 'all',
        minChunks: 2, // 2个共享以及以上都提取
        minSize  : 0,
        priority : -10, // 优先级
      },

      // 提出每个模块公共的代码
      'framework.commons' : {
        name              : 'framework.commons',
        // filename          : 'framework/[name].[contenthash:6].js',
        enforce           : true,
        test              : /\.js$/,
        chunks            : 'initial',
        minChunks         : 2, // 两个共享以及以上都提取,
        minSize           : 0,
        priority          : -20, // 优先级
        reuseExistingChunk: true,
        enforce           : true,
      },

      // css : {
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
    },
  },
};

// export const context = ''

export { default as performance } from './performance';

export { default as module } from './module';

export const bail = true;

export const target = 'web';

export const devtool = 'cheap-module-eval-source-map';

// "development" | "production" | "none"
export const mode = 'development';

// export { default as entry } from './entry';

// export { default as output } from './output';

// export const resolve = ''
