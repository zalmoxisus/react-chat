import React, { Component, PropTypes } from 'react';
import styles from '../../contactlist.scss';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

export default class MenuRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willDelete: false
    };
  }
  deleteContact = () => {
    this.setState({ willDelete: true });
  };
  handleClose = () => {
    this.setState({ willDelete: false });
  };
  handleConfirm = () => {
    this.props.onDelete(this.props.contactItem.id, () => {
      console.log('onDelete success');
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
        {
          (this.state.willDelete) ?
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <div className={styles.confirmText}>
                  You are about to remove {contactItem.name}.
                  <br />All related chats will be closed.
                </div>
                <div className={styles.confirmBtns}>
                  <span onClick={this.handleClose}>Cancel</span>
                  <span onClick={this.handleConfirm}>Confirm</span>
                </div>
              </ModalDialog>
            </ModalContainer> : null
        }
      </div>
    );
  }
}

MenuRight.propTypes = {
  contactItem: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};