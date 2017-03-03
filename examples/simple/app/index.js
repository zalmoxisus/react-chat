import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import './style.scss';
import testMessages from './testMessages';

class Container extends Component {

  render() {
    return (
      <Chat messages={testMessages} />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
