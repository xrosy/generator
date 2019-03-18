import path from "path";
import fs from "fs";
import webpack from "webpack";
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

export default ({
    projectPath
}) => {
    const context = getProjectContext(projectPath);

    /* Generate configs Object */
    return {
        context,

        mode: "none",

        entry: ["./src/apps/admin/main"],

        output: {
            path: "/Users/jason/workspace/xrosy-generator/example/build",
            filename: "bundle.js"
        },
        optimization: {
            minimize: true
        },

        resolve: {
            alias: {},

            /* 引入依赖或者文件时，强制要求添加文件的扩展名 */
            enforceExtension: true,

            enforceModuleExtension: false,

            extensions: [".js", ".jsx"]
        },

        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            }]
        },

        plugins: []
    };
};