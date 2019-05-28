import path from 'path';
import fs from 'fs';

import yaml from 'node-yaml';


export const pathExists = (strPath) => fs.existsSync(strPath)


const _readYamlConfig = (targetPath, encoding = 'utf8') => {
  let userConf;

  userConf = {};

  try {
    userConf = yaml.readSync(targetPath, { encoding });
  }
  catch (e) {
    console.error(e);
  }

  return userConf;
};


const _findUserProfile = (workspace) => {
  const supporter = [ '.xrosyrc', '.xrosyrc.yml', '.xrosyrc.yaml', '.xrosyrc.json' ];

  return supporter.find((item) => fs.existsSync(path.join(workspace, item)));
};


export const getWorkspace = (dir) => path.resolve(dir);


export const xrosyrc = (workspace) => {
  const profileName = _findUserProfile(workspace);

  if (typeof profileName !== 'string') return {};

  const profilePath = path.join(workspace, profileName);

  switch (profileName) {
    default:
      return _readYamlConfig(profilePath);
  }
};
