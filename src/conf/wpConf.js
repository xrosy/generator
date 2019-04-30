import path from "path";
import fs from "fs";
import webpack from "webpack";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import yaml from "node-yaml";

const userConfigLoader = projectDir => {
    const ymlPath = path.join(projectDir, "./.xrosyrc.yml");

    if (fs.existsSync(ymlPath) === false) {
        return {};
    }

    return yaml.readSync(ymlPath, {
        encoding: "utf8"
    });
};

class XrosyConf {
    constructor(settingsObj) {
        this.__ = {
            ...settingsObj
        };

        this.engine = "react";

        this.env = this.getEnvironment();

        this.projectContext = this.getProjectContext();

        this.userConf = this.getUserConfig();

        this.entriesObj = this.getEntriesObj();

        this.ModuleRules = this.getModuleRules();

        this.resolveExtensions = this.getResolveExtensions();
    }

    getProjectContext() {
        return this.projectContext || path.resolve(this.__.projectDir);
    }

    getEnvironment() {
        return (
            this.__.env || process.env.xrosy_env || process.env.NODE_ENV || "dev"
        );
    }

    getUserConfig() {
        return this.userConf || userConfigLoader(this.projectContext);
    }

    getEntriesObj() {
        const entriesObj = {};
        const projectContext = this.getProjectContext();
        const {
            entries
        } = this.getUserConfig();

        return entries.map((app, keyIndex) => path.join(projectContext, app));
    }

    getResolveExtensions() {
        return [".js", ".jsx"];
    }

    getModuleRules() {
        return [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }];
    }
}
/* ---------------------------------------- */

const getProjectContext = (targetPath = '.') => {
    return path.resolve(targetPath);
}



/**
 * 生成配置项目
 * @params    {object}      options - Customer
 * @return    {object}      webpack options
 */
export default ({
    workspace
}) => {
    const context = getProjectContext(workspace);



    /* Generate configs Object */
    return {
        context,

        mode: "none",

        entry: [
            './src/admin/index.js'
        ],

        output: {
            path: './build',
            filename: "[name].js",
            // publicPath: '',
        },

        // chunkFilename: 'libs',

        resolve: {
            /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
            // enforceExtension: true,
            // enforceModuleExtension: false,
            alias: {},
            extensions: [".js", ".jsx"]
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    },
                }
            ]
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin({}),
        ],

        optimization: { minimize: true },
    };
};