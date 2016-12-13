import React, { Component, PropTypes } from 'react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './contactlist.scss';

export default class UserMenu extends Component {
  getIndex() {
    const contacts = this.props.store.contactList;
    const index = contacts.map((item) => { return item.id; }).indexOf(this.props.contactItem.id);
    return contacts[index];
  }
  deleteContact = () => {
    const modalContent = {
      type: 'contacts',
      title: this.props.contactItem.name,
      func: this.handleConfirm
    };
    this.props.store.openModal(modalContent);
  };
  handleClose = () => {
    this.props.store.closeModal();
  };
  handleConfirm = () => {
    this.getIndex().deleteContact(this.props.contactItem);
  };
  showInfo = () => {
    this.getIndex().handleInfo(this.props.contactItem);
  };
  sendMessage = () => {
    this.getIndex().handleMessage(this.props.contactItem);
  };
  videoCall = () => {
    this.getIndex().handleCall(this.props.contactItem);
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
