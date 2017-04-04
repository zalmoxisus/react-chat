import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import './style.scss';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';

const user = {
  _id: '2',
  name: 'Marry'
};

const lang = 'en';

class Container extends Component {
  state = { messages: testMessages };

  onSend = message => {
    console.log('new message', message);
    this.setState(previousState => ({
      messages: [
        ...previousState.messages,
        {
          ...message,
          _id: Date.now() / 1000 | 0,
          createdAt: new Date(),
          user
        }
      ]
    }));
  };

  onInputTextChanged = value => {
    console.log('input text changed', value);
  };

  onTranslate(txt, to, cb) {
    // Add here your translation method
    cb(txt);
  }

  render() {
    return (
      <Chat
        user={user}
        messages={this.state.messages}
        onSend={this.onSend}
        onInputTextChanged={this.onInputTextChanged}
        onTranslate={this.onTranslate}
        translateLanguages={translateLanguages}
        lang={lang}
      />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
