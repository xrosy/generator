import React      from 'react';
import ReactDOM   from 'react-dom';
import { Button } from 'antd-mobile';


class Admin extends React.Component {
  render() {
    return (
      <div>
        <span>Admin</span>
        <Button>登陆</Button>
      </div>
    );
  }
}


ReactDOM.render(<Hello />, document.getElementById('appContainer'));


