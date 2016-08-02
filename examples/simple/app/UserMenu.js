import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import { inject } from 'mobx-react';
import styles from './usermenu.scss';

@inject('appStore', 'chatStore', 'contactStore', 'message')
export default class UserMenu extends Component {
  deleteContact = () => {
    const modalContent = (
      <div>
        <div className={styles.confirmText}>
          You are about to remove {this.props.message.name}.
          <br />All related chats will be closed.
        </div>
        <div className={styles.confirmBtns}>
          <span onClick={this.handleClose}>Cancel</span>
          <span onClick={this.handleConfirm}>Confirm</span>
        </div>
      </div>
    );
    this.props.appStore.openModal(modalContent);
  };
  handleClose = () => {
    this.props.appStore.closeModal();
  };
  handleConfirm = () => {
    this.props.contactStore.deleteContact(this.props.message, () => {
      this.props.appStore.closeModal();
    });
  };
  showInfo = () => {
    this.props.contactStore.handleInfo(this.props.message);
  };
  sendMessage = () => {
    this.props.contactStore.handleMessage(this.props.message);
  };
  videoCall = () => {
    this.props.contactStore.handleCall(this.props.message);
  };

  render() {
    return (
      <div className={styles.menuBtns}>
        <MdInfo onClick={this.showInfo} />
        <MdMessage onClick={this.sendMessage} />
        <MdVideocam onClick={this.videoCall} />
        <MdClose onClick={this.deleteContact} />
      </div>
    );
  }
}

UserMenu.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object,
  contactStore: PropTypes.object,
  message: PropTypes.object
};
