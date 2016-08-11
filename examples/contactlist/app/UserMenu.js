import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './contactlist.scss';

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
    this.props.appStore.openModal(modalContent);
  };
  handleClose = () => {
    this.props.appStore.closeModal();
  };
  handleConfirm = () => {
    this.props.contactStore.deleteContact(this.props.contactItem, () => {
      this.props.appStore.closeModal();
    });
  };
  showInfo = () => {
    this.props.contactStore.handleInfo(this.props.contactItem);
  };
  sendMessage = () => {
    this.props.contactStore.handleMessage(this.props.contactItem);
  };
  videoCall = () => {
    this.props.contactStore.handleCall(this.props.contactItem);
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
  appStore: PropTypes.object,
  contactItem: PropTypes.object
};
