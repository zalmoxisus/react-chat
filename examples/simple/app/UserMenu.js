import React, { Component, PropTypes } from 'react';
import styles from './usermenu.scss';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import { inject } from 'mobx-react';

@inject('contactStore', 'contactViewStore')
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
    this.props.contactStore.deleteContact(() => {
      this.props.closeModal();
    });
  };
  showInfo = () => {
    this.props.contactViewStore.handleInfo();
  };
  sendMessage = () => {
    this.props.contactViewStore.handleMessage();
  };
  videoCall = () => {
    this.props.contactViewStore.handleCall();
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
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
