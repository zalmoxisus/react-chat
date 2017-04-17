import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react';
import Chat from 'react-chat';
import './style.scss';
import Store from './store/Store';
import translateLanguages from './translateLanguages';
import ModalDialog from './ModalDialog';

useStrict(true);
const chatStore = new Store();

@observer
class Container extends Component {
  componentWillMount() {
    window.speechSynthesis.onvoiceschanged = () => {
      chatStore.getVoices();
    };
  }
  render() {
    return (
      <div>
        {
          chatStore.modal &&
          <ModalDialog
            modal={chatStore.modal}
            handleModal={chatStore.handleModal}
            submitModal={chatStore.submitModal}
          />
        }
        <Chat
          {...{ translateLanguages }}
          user={chatStore.user}
          messages={chatStore.messages.toJS()}
          onSend={chatStore.onSend}
          onInputTextChanged={chatStore.onInputTextChanged}
          onTranslate={chatStore.onTranslate}
          onTranslate={chatStore.onTranslate}
          lang={chatStore.lang}
          nativeLng={chatStore.nativeLng}
          handleModal={chatStore.handleModal}
          manageMessage={chatStore.manageMessage}
          ban={chatStore.ban}
          voices={chatStore.voices.toJS()}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
