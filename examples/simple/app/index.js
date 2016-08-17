import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import Chat from 'react-chat';
import AppStore from './store/AppStore';
import ChatStore from './store/ChatStore';
import ContactStore from './store/ContactStore';
import './style.scss';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';

useStrict(true);

const appStore = new AppStore({
  me: { id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg' }
});
const chatStore = new ChatStore({ translateLanguages });
const contactStore = new ContactStore();

// Emulate fetching messages
setTimeout(() => { chatStore.addMessages(testMessages); });

@observer
class Container extends Component {

  render() {
    return (
      <div>
        <ModalDialog
          content={appStore.modal}
          onClose={appStore.closeModal}
        />
        <Provider
          appStore={appStore} chatStore={chatStore}
          contactStore={contactStore} UserMenu={UserMenu}
        >
          <Chat />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
