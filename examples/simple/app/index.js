import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import ChatStore from './store/ChatStore';
import Chat from 'react-chat';
import './style.scss';
import translateLanguages from './translateLanguages';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';

useStrict(true);

const lang = 'en';
const nativeLng = 'en';
const withPhoto = true;
const toolTipPosition = 'right';

const chatStore = new ChatStore();

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
  }

  handleTranslate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };

  handleDelete = (message, success) => {
    // Add here delete method
    success();
  };

  handleRestore = (message, success) => {
    // Add here restore method
    success();
  };

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
      onInfo={this.handleInfo}
      onMessage={this.handleMessage}
      onCall={this.handleCall}
      onDelete={this.handleDelete}
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
        <Provider chatStore={chatStore}>
          <Chat
            userId={chatStore.me.id}
            lang={lang}
            onTranslate={this.handleTranslate}
            onDelete={this.handleDelete}
            onRestore={this.handleRestore}
            onBan={this.handleBan}
            translateLanguages={translateLanguages}
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
