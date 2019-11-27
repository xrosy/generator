
export default class WPConfig {

  /* ------------------------------------ */
  mode = 'none';

  devtool = 'eval-source-map';

  entry = {};

  output = {
    filename  : 'static/[name.hash:6].js',
    publicPath: '',
    pathinfo  : false,
  };

  resolve = {
    alias : {},

    extensions            : [ '.jsx', '.js' ],
    /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
    enforceExtension      : false,
    /* 对模块是否需要使用的扩展 */
    enforceModuleExtension: false,
    // modules : [ path.join(wpWorkspace, 'node_modules') ],
  };

  module = {
    rules : [
      {
        test: /\.less$/,
        use : [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
      },

      {
        test: /\.(scss)$/,
        use : [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'scss-loader' }],

      },

      {
        test: /\.(js|jsx)$/,
        use : {
          loader : 'babel-loader',
          options: { presets: [ '@babel/preset-env', '@babel/preset-react' ]},
        },
        exclude : /(node_modules|bower_components)/,
      }
    ],
  };

  optimization = {
    minimize : true,
  };

}
