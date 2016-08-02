import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Chat from 'react-chat';
import ChatStore from './store/ChatStore';
import ChatViewStore from './store/ChatViewStore';
import ContactStore from './store/ContactStore';
import ContactViewStore from './store/ContactViewStore';
import './style.scss';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';

useStrict(true);

const chatStore = new ChatStore();
const chatViewStore = new ChatViewStore();
const contactStore = new ContactStore();
const contactViewStore = new ContactViewStore();

const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
    chatStore.me = me;
  }

  closeModal = () => {
    this.setState({ modal: null });
  };

  openModal = (modalContent) => {
    this.setState({ modal: modalContent });
  };

  userMenu = (
    <Provider contactStore={contactStore} contactViewStore={contactViewStore}>
      <UserMenu
        openModal={this.openModal}
        closeModal={this.closeModal}
      />
    </Provider>
  );

  render() {
    return (
      <div>
        <ModalDialog
          content={this.state.modal}
          onClose={this.closeModal}
        />
        <Provider chatStore={chatStore} chatViewStore={chatViewStore}>
          <Chat
            openModal={this.openModal}
            closeModal={this.closeModal}
            userId={me.id}
            userMenu={this.userMenu}
          />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
