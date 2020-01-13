import MiniCssExtractPlugin from 'mini-css-extract-plugin';


const MiniCssExtractPluginLoader = {
  loader : MiniCssExtractPlugin.loader,
  options: {
    reloadAll : false,
    publicPath: '../',
    // hmr       : builtMode === MODE_DEVELOPMENT,
  },
};


const $StyleRules = [
  MiniCssExtractPluginLoader,
  {
    loader : 'css-loader',
    options: { importLoaders: 1 },
  }
];


const BROWSERS = [
  'last 3 versions',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 12.1',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
  'and_uc 9.9'
];

export default [
  {
    test: /\.jsx?$/,
    use : {
      loader : 'babel-loader',
      options: {
        cacheDirectory: true,
        presets       : [
          [ '@babel/preset-env', {
            /* 将此参数设置为false,既将module交由webpack处理，而不是babel */
            modules    : 'auto', // 'commonjs', 'amd', 'umd', 'systemjs', 'auto'
            useBuiltIns: 'usage',
            corejs     : '3.4.7',
            // shippedProposals: true,
            targets    : {
              browsers : BROWSERS,
            },
          }],
          [ '@babel/preset-react', {
          }]
        ],
        plugins : [
          '@babel/plugin-proposal-class-properties',
          [ '@babel/plugin-transform-runtime', { corejs: 3, helpers: true }]
        ],
      },
    },
    // include : path.join(absWorkspace, 'src'),
    exclude : /(node_modules|bower_components)/,
  },


  {
    test: /\.(jpg|png|gif|bmp|jpeg)$/,
    use : [{
      loader : 'url-loader',
      options: {
        esModule  : false,
        limit     : 8192,
        publicPath: '../',
        name      : 'images/[hash:16].[ext]',
      },
    }],
  },


  {
    test: /\.s?css$/,
    use : [ ...$StyleRules, { loader: 'sass-loader' }],
  },


  {
    test: /\.less$/,
    use : [ ...$StyleRules, { loader: 'less-loader' }],
  },


  {
    test: /\.svg$/,
    use : [{
      loader : 'url-loader',
      options: {
        esModule  : false,
        limit     : 10,
        publicPath: '../',
        name      : 'images/[hash:16].[ext]',
      },
    }],
  },
];
