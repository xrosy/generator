import path from 'path';

class XrosyConf {
  constructor(settingsObj) {

    this.__ = { ...settingsObj };

    this.projectContext    = this.getProjectContext();
    this.entriesObj        = this.getEntriesObj();
    this.ModuleRules       = this.getModuleRules();
    this.resolveExtensions = this.getResolveExtensions();
  }

  getEntriesObj() {}


  getProjectContext() {
    return path.resolve(this.__.projectDir);
  }

  getResolveExtensions() {
    return ['.js', '.jsx'];
  }

  getModuleRules() {
    return [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }];
  }
}

export default (...args)=>{
  const settings = new XrosyConf(...args);

  /* Generate configs Object */
  return {
    context: settings.projectContext,

    entry  : settings.entriesObj,

    output : {},

    resolve: {
      extensions: settings.resolveExtensions,
    }

  };
}

