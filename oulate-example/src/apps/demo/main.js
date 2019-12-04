import ReactDOM from 'react-dom';
import React from 'react';

import Pages from './components/pages-a';

import { moment, VERSION_CODE } from '@utils';
import env from '@env';


import './style.less';
import './style.scss';


console.log(VERSION_CODE);
console.log(env.DOMAIN);

ReactDOM.render(
  <h1>
  Hello Word, DEMO
    <Pages name="demo" />
  </h1>,
  document.getElementById('root')
);
