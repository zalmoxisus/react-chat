import React, { Component, PropTypes } from 'react';
import styles from './contactlist.scss';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';

export default class UserMenu extends Component {
  deleteContact = () => {
    const modalContent = (
      <div>
        <div className={styles.confirmText}>
          You are about to remove {this.props.contactItem.name}.
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
    this.props.chatStore.deleteContact(this.props.contactItem, () => {
      this.props.closeModal();
    });
  };
  showInfo = () => {
    this.props.chatViewStore.handleInfo(this.props.contactItem);
  };
  sendMessage = () => {
    this.props.chatViewStore.handleMessage(this.props.contactItem);
  };
  videoCall = () => {
    this.props.chatViewStore.handleCall(this.props.contactItem);
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
  chatStore: PropTypes.object,
  chatViewStore: PropTypes.object,
  contactItem: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
