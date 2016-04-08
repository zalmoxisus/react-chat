import React, { Component, PropTypes } from 'react';
import styles from '../../contactlist.scss';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';

export default class MenuRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willDelete: false
    };
  }
  deleteContact = () => {
    const modalContent = (
      <div className={styles.modal}>
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
    this.props.onDelete(this.props.contactItem.id, () => {
      this.props.closeModal();
    });
  };
  render() {
    const { contactItem, onEdit } = this.props;
    return (
      <div className={styles.optionsRight}>
        <span id={'a' + contactItem.id}>
          <MdEdit onClick={onEdit} />
        </span>
        <MdClose onClick={this.deleteContact} />
      </div>
    );
  }
}

MenuRight.propTypes = {
  contactItem: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};