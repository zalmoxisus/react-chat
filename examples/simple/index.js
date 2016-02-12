import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';
const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};
const lang = 'en';
const nativeLng = 'en';

class Container extends Component {
  state = {
    messages: testMessages,

    add(message) {
      this.messages.push(message);
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
    success();
  };

  handleRestore = (message, success) => {
    // Add here restore method
    success();
  };

  handleBan = (id, success) => {
    // Add here ban method
    success();
  };

  render() {
    return (
      <Chat
        me={me}
        lang={lang}
        messages={testMessages}
        onSend={this.handleSend}
        onTranslate={this.handleTranslate}
        onDelete={this.handleDelete}
        onRestore={this.handleRestore}
        onBan={this.handleBan}
        translateLanguages={translateLanguages}
        nativeLng={nativeLng}
      />
    );
  }
}

ReactDOM.render(<Container/>, document.getElementById('root'));
