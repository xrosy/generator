import path from 'path';




class XrosyConf {
  constructor(settingsObj) {

    this.__ = { ...settingsObj };

    this.projectContext = this.getProjectContext();

    console.log(this);
  }

  getProjectContext() {
    return path.resolve(this.__.projectDir);
  }

  getExtensions() {
    return ['.js', '.jsx'];
  }

  getLoaders() {
    return [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }


}

export default (...args)=>{
  return new XrosyConf(...args);
}

