import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import testMessages from './testMessages';
const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg',
  lng: 'en'
};

class Container extends Component {
  state = {
    messages: testMessages,

    add(message) {
      this.messages.push(message);
    },

    delete(message) {
      this.messages.forEach(function (item, index, object) {
        if (item.id === message) {
          object.splice(index, 1);
        }
      });
    }
  };

  handleSend = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    this.state.add(message);
    this.setState(this.state);
    success();
  };

  handleTranslate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };

  handleDelete = (message, success) => {
    // Add here delete method
    this.state.delete(message);
    this.setState(this.state);
    success();
  };

  render() {
    return (
      <Chat
        me={me}
        messages={testMessages}
        onSend={this.handleSend}
        onTranslate={this.handleTranslate}
        onDelete={this.handleDelete}
      />
    );
  }
}

ReactDOM.render(<Container/>, document.getElementById('root'));
