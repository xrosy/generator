import React      from 'react';
import Demo from './demo.jsx';


export default class extends React.Component {

  componentDidMount () {
    console.log('env:', env);
  }

  render() {
    return (
      <div>
        <span>Admin aaaaa</span>
        <Demo />
      </div>
    );
  }
}





