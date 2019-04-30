import path from "path";
import fs   from 'fs';
import yaml from "node-yaml";



export const getWorkspace = (dir) => {
  return path.resolve(dir);
};


export const xrosyrc = (workspace) => {
  const filename = [
    '.xrosyrc',
    '.xrosyrc.yml',
    '.xrosyrc.yaml',
    '.xrosyrc.json',
  ].find((item) => {
    const source = path.join(workspace, item);
    return fs.existsSync(source);
  });

  if (filename) {
    path.join(workspace, target)
    return yaml.readSync(sourcePath, { encoding: "utf8"});
  }

  return {};
};