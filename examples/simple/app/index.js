import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import './style.scss';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';
import UserMenu from './UserMenu';
import ModalDialog from './ModalDialog';

const user = {
  _id: '2',
  name: 'Marry'
};

const lang = 'en';
const nativeLng = 'en';

class Container extends Component {
  state = {
    messages: testMessages,
    modal: undefined,
    voices: []
  };

  componentDidMount = () => {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices()
        .filter(voice => voice.lang.indexOf(lang) > -1);
      this.setState({ voices: this.voices });
    };
  };

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

  handleModal = (modalContent, closed) => {
    if (closed) this.setState({ modal: modalContent });
    else this.setState({ modal: undefined });
  };

  submitModal = (val) => {
    const modal = this.state.modal;
    if (modal['msg']) modal.func(val, modal['msg']);
    else modal.func(val);
    setTimeout(() => { this.handleModal(); }, 1);
  };

  ban(id, success) {
    // Add here ban method
    success();
  }

  manageMessage = (id, removeMsg) => {
    const messages = this.state.messages;
    messages.forEach((message) => {
      if (message._id === id) {
        message.removed = removeMsg;
        this.setState({ messages });
      }
    });
  };

  render() {
    return (
      <div>
        {
          this.state.modal &&
          <ModalDialog
            modal={this.state.modal}
            handleModal={this.handleModal}
            submitModal={this.submitModal}
          />
        }
        <Chat
          {...{ user, translateLanguages, lang, nativeLng, UserMenu }}
          messages={this.state.messages}
          onSend={this.onSend}
          onInputTextChanged={this.onInputTextChanged}
          onTranslate={this.onTranslate}
          handleModal={this.handleModal}
          voices={this.state.voices}
          manageMessage={this.manageMessage}
          ban={this.ban}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
