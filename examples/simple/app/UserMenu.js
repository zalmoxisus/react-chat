import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './usermenu.scss';

export default class UserMenu extends Component {
  deleteContact = () => {
    const modalContent = {
      type: 'delete',
      title: this.props.user.name + ' will be banned',
      func: this.onDelete
    };
    this.props.openModal(modalContent);
  };

  showInfo = () => {
    // Add here info method
    console.log('handleInfo. userId: ' + this.props.user._id + '. msgId: ' + this.props.msgId);
  };

  onSend = () => {
    // Add here message method
    console.log('handleMessage: ' + this.props.user._id + '. msgId: ' + this.props.msgId);
  };

  onCall = () => {
    // Add here call method
    console.log('call method: ' + this.props.user._id + '. msgId: ' + this.props.msgId);
  };

  onDelete = () => {
    // Add here remove contact method
    console.log('delete method: ' + this.props.user._id + '. msgId: ' + this.props.msgId);
    this.props.closeModal();
  };

  render() {
    return (
      <div className={styles.menuBtns}>
        <MdInfo onClick={this.showInfo} />
        <MdMessage onClick={this.onSend} />
        <MdVideocam onClick={this.onCall} />
        <MdClose onClick={this.deleteContact} />
      </div>
    );
  }
}
