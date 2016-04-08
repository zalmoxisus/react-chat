import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import './style.scss';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';
import ModalExample from './ModalExample';
const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};
const lang = 'en';
const nativeLng = 'en';
const withPhoto = true;
const toolTipPosition = 'right';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: testMessages,
      modal: null
    };
  }

  handleSend = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
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

  closeModal = () => {
    this.setState({ modal: null });
  };

  openModal = (modalContent) => {
    this.setState({ modal: modalContent });
  };

  render() {
    return (
      <div>
        <ModalExample
          content={this.state.modal}
          onClose={this.closeModal}
        />
        <Chat
          userId={me.id}
          lang={lang}
          messages={testMessages}
          onSend={this.handleSend}
          onTranslate={this.handleTranslate}
          onDelete={this.handleDelete}
          onRestore={this.handleRestore}
          onBan={this.handleBan}
          translateLanguages={translateLanguages}
          nativeLng={nativeLng}
          withPhoto={withPhoto}
          openModal={this.openModal}
          closeModal={this.closeModal}
          toolTipPosition={toolTipPosition}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
