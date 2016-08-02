import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import { inject } from 'mobx-react';
import styles from './usermenu.scss';

@inject('contactStore', 'contactViewStore', 'message')
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
    this.props.openModal(modalContent);
  };
  handleClose = () => {
    this.props.closeModal();
  };
  handleConfirm = () => {
    this.props.contactStore.deleteContact(this.props.message, () => {
      this.props.closeModal();
    });
  };
  showInfo = () => {
    this.props.contactViewStore.handleInfo(this.props.message);
  };
  sendMessage = () => {
    this.props.contactViewStore.handleMessage(this.props.message);
  };
  videoCall = () => {
    this.props.contactViewStore.handleCall(this.props.message);
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
  contactStore: PropTypes.object,
  contactViewStore: PropTypes.object,
  message: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
