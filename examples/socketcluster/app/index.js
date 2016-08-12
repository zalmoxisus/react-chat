import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import './style.scss';
import UserMenu from './UserMenu';
import ChatStore from './store/ChatStore';
import AppStore from './store/AppStore';
import ContactStore from './store/ContactStore';
import ModalDialog from './ModalDialog';
import translateLanguages from './translateLanguages';

useStrict(true);

const appStore = new AppStore();
const chatStore = new ChatStore({ translateLanguages });
const contactStore = new ContactStore();

@observer
class Container extends Component {

  componentDidMount() {
    chatStore.initialize();
  }

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
