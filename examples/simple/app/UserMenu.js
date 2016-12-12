import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './usermenu.scss';

export default class UserMenu extends Component {
  deleteContact = () => {
    const modalContent = (
      <div>
        <div className={styles.confirmText}>
          You are about to remove {this.props.name}.
          <br />All related chats will be closed.
        </div>
        <div className={styles.confirmBtns}>
          <span onClick={this.handleClose}>Cancel</span>
          <span onClick={this.handleConfirm}>Confirm</span>
        </div>
      </div>
    );
    this.props.store.openModal(modalContent);
  };
  handleClose = () => {
    this.props.store.closeModal();
  };
  handleConfirm = () => {
    this.props.store.deleteContact(this.props.store.me.get('id'), this.props.msgId, () => {
      this.props.store.closeModal();
    });
  };
  showInfo = () => {
    this.props.store.handleInfo(this.props.store.me.get('id'), this.props.msgId);
  };
  sendMessage = () => {
    this.props.store.handleMessage(this.props.store.me.get('id'), this.props.msgId);
  };
  videoCall = () => {
    this.props.store.handleCall(this.props.store.me.get('id'), this.props.msgId);
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
  store: PropTypes.object,
  name: PropTypes.string,
  msgId: PropTypes.number
};
