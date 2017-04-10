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
      func: this.handleConfirm
    };
    this.props.openModal(modalContent);
  };
  handleClose = () => {
    this.props.closeModal();
  };
  handleConfirm = () => {
    this.props.deleteContact(this.props.user._id, this.props.msgId);
  };
  showInfo = () => {
    this.props.handleContactInfo(this.props.user._id, this.props.msgId);
  };
  sendMessage = () => {
    this.props.handleContactMessage(this.props.user._id, this.props.msgId);
  };
  videoCall = () => {
    this.props.handleContactCall(this.props.user._id, this.props.msgId);
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
