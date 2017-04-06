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
const voicesAccess = true;

class Container extends Component {
  state = {
    messages: testMessages,
    modal: undefined,
    voices: []
  };

  componentDidMount = () => {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.indexOf(lang) > -1);
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

  openModal = (modalContent) => {
    this.modal = {
      type: modalContent.type,
      title: modalContent.title,
      msg: modalContent.msg
    };
    if (modalContent.list) {
      this.modal.list = modalContent.list.map(function (item) {
        return item;
      });
    }
    this.modal.func = modalContent.func;
    this.setState({ modal: this.modal });
  };

  submitModal = (val) => {
    const modal = this.state.modal;
    if (modal['msg']) modal.func(val, modal['msg']);
    else modal.func(val);
    setTimeout(() => { this.closeModal(); }, 1);
  };

  closeModal = () => {
    this.setState({ modal: undefined });
  };

  render() {
    return (
      <div>
        {
          this.state.modal &&
          <ModalDialog
            modal={this.state.modal}
            closeModal={this.closeModal}
            submitModal={this.submitModal}
          />
        }
        <Chat
          {...{ user, translateLanguages, lang, nativeLng, UserMenu, voicesAccess }}
          messages={this.state.messages}
          onSend={this.onSend}
          onInputTextChanged={this.onInputTextChanged}
          onTranslate={this.onTranslate}
          openModal={this.openModal}
          voices={this.state.voices}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
