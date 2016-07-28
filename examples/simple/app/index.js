import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import ChatStore from './store/ChatStore';
import ChatViewStore from './store/ChatViewStore';
import Chat from 'react-chat';
import './style.scss';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';

useStrict(true);

const lang = 'en';
const nativeLng = 'en';
const withPhoto = true;
const toolTipPosition = 'right';

const chatStore = new ChatStore();
const chatViewStore = new ChatViewStore();

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
  }

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

  handleInfo = () => {
    // Add here info method
    console.log('info method');
  };

  handleMessage = () => {
    // Add here message method
    console.log('message method');
  };

  handleCall = () => {
    // Add here call method
    console.log('call method');
  };

  userMenu = (
    <UserMenu
      chatStore={chatStore}
      onInfo={this.handleInfo}
      onMessage={this.handleMessage}
      onCall={this.handleCall}
      openModal={this.openModal}
      closeModal={this.closeModal}
    />
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
            lang={lang}
            onBan={this.handleBan}
            nativeLng={nativeLng}
            withPhoto={withPhoto}
            openModal={this.openModal}
            closeModal={this.closeModal}
            toolTipPosition={toolTipPosition}
            userMenu={this.userMenu}
          />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
