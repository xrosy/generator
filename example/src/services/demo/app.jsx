import React from 'react';
import ReactDOM from 'react-dom';

import DemoComponents from './components/demo.jsx';

export default class AdminDemo extends React.Component {

  componentDidMount () {
    console.log('env:', env);
  }

  render() {
    return (
      <div>
        <span>src/services/demo 1aaa</span>
        <DemoComponents />
      </div>
    );
  }

}


if (module.hot) module.hot.accept();


ReactDOM.render(<AdminDemo />, document.body);
