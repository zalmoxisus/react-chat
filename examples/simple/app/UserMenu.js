import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdClose from 'react-icons/lib/md/close';
import styles from './usermenu.scss';

export default class UserMenu extends Component {
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
    this.props.handleModal();
  };

  deleteContact = () => {
    const modalContent = {
      type: 'delete',
      title: this.props.user.name + ' will be banned',
      func: this.onDelete
    };
    this.props.handleModal(modalContent, true);
  };

  showInfo = () => {
    // Add here info method
    console.log('handleInfo. userId: ' + this.props.user._id + '. msgId: ' + this.props.msgId);
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

UserMenu.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.any,
    name: PropTypes.string
  }).isRequired,
  handleModal: PropTypes.func,
  msgId: PropTypes.string
};
