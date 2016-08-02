import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import Chat from 'react-chat';
import ChatStore from './store/ChatStore';
import ContactStore from './store/ContactStore';
import './style.scss';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';

useStrict(true);

const chatStore = new ChatStore();
const contactStore = new ContactStore();

const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};

@observer
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
    chatStore.me = me;
  }

  userMenu = (
    <Provider contactStore={contactStore} chatStore={chatStore}>
      <UserMenu />
    </Provider>
  );

  render() {
    return (
      <div>
        <ModalDialog
          content={chatStore.modal}
          onClose={chatStore.closeModal}
        />
        <Provider chatStore={chatStore} contactStore={contactStore}>
          <Chat
            userId={me.id}
            userMenu={this.userMenu}
          />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
