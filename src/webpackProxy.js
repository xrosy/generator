import path from "path";
import webpack from "webpack";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

import * as utils from "./utils.js";
import devServer from "./server.js";

import { CONST_PORT, CONST_DIST_PATH, CONST_ENV } from "./defConf.js";



const wpAgent = ({ workspace = ".", port, env, distDir }) => {
  const wpWorkspace = utils.getWorkspace(workspace);
  const customConf  = utils.xrosyrc(wpWorkspace);

  const wpOutputPath = path.join(wpWorkspace, "./build");

  const wpConfig = {
    context: wpWorkspace,

    mode: "none",

    devtool: "eval-source-map",

    entry: {
      admin: ["webpack-hot-middleware/client", "./src/admin/index.js"]
    },

    output: {
      path: wpOutputPath,
      filename: "[name].js",
      publicPath: "/",
      pathinfo: false
    },

    resolve: {
      /* 引入依赖或者文件时，强制要求添加文件的扩展名 */

      alias: {},
      extensions: [".js", ".jsx"],
      enforceExtension: false,

      /* 对模块是否需要使用的扩展 */
      enforceModuleExtension: false

      // modules: [ path.join(wpWorkspace, 'node_modules') ],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin({ dry: false, verbose: false }),
      new webpack.DefinePlugin({
        env: JSON.stringify(process.env.NODE_ENV || "dev")
      }),

      // new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        chunks: ["library", "utils", "admin"]
      })
    ],

    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          libs: {
            name: "library",
            test: /node_modules/,
            chunks: "initial",
            // 打包后的文件名，任意命名
            // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            priority: 10
          },

          utils: {
            name: "utils",
            chunks: "initial",
            // 只要超出0字节就生成一个新包
            minSize: 0
          }
        }
      }
    }
  };

  return webpack(wpConfig);
};

/* -------------------------------------------------------------------------- */
/*  */
export const buildActivity = (workspace, args) => {
  const { env, port = CONST_PORT } = args;

  wpAgent({ workspace });
};

/*  */
export const devActivity = (workspace, args) => {
  const { env, port = CONST_PORT } = args;

  devServer(wpAgent({ workspace }));
};
