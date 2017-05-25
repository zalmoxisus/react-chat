import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './usermenu.scss';

@inject('store')
export default class UserMenu extends Component {
  getIndex() {
    const contacts = this.props.store.contactList;
    const index = contacts.map((item) => { return item.id; }).indexOf(this.props.msgId);
    return contacts[index];
  }
  deleteContact = () => {
    const modalContent = {
      type: 'delete',
      title: this.props.name + ' will be banned',
      func: this.handleConfirm
    };
    this.props.store.openModal(modalContent);
  };
  handleClose = () => {
    this.props.store.closeModal();
  };
  handleConfirm = () => {
    this.getIndex()
      .deleteContact(this.props.store.me.get('id'), this.props.msgId);
  };
  showInfo = () => {
    this.getIndex().handleInfo(this.props.store.me.get('id'), this.props.msgId);
  };
  sendMessage = () => {
    this.getIndex().handleMessage(this.props.store.me.get('id'), this.props.msgId);
  };
  videoCall = () => {
    this.getIndex().handleCall(this.props.store.me.get('id'), this.props.msgId);
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
