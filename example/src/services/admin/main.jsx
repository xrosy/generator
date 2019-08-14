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
        <span>Admin aaaadfff</span>
        <DemoComponents />
      </div>
    );
  }

}


ReactDOM.render(<AdminDemo />, document.body);
