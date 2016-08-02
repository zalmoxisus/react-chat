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

useStrict(true);

const appStore = new AppStore();
const chatStore = new ChatStore();
const contactStore = new ContactStore();

@observer
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
  }

  userMenu = (
    <Provider contactStore={contactStore} chatStore={chatStore} appStore={appStore}>
      <UserMenu />
    </Provider>
  );

  render() {
    return (
      <div>
        <ModalDialog
          content={appStore.modal}
          onClose={appStore.closeModal}
        />
        <Provider appStore={appStore} chatStore={chatStore} contactStore={contactStore}>
          <Chat
            userMenu={this.userMenu}
          />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
