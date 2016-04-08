import React, { Component, PropTypes } from 'react';
import styles from '../contactlist.scss';
import Avatar from './Avatar';
import MenuLeft from './contacts/MenuLeft';
import MenuRight from './contacts/MenuRight';

export default class Contacts extends Component {
  mapRef = (node) => {
    this.name = node;
  };

  handleClose = () => {
    this.props.closeModal();
  };

  showEdit = () => {
    const modalContent = (
      <div className={styles.modal}>
        <div className={styles.editContainer}>
          <input autoFocus
            className={styles.editInput}
            maxLength="45"
            defaultValue={this.props.contactItem.name}
            ref={this.mapRef}
          />
        </div>
        <div className={styles.confirmBtns}>
          <span onClick={this.handleClose}>Cancel</span>
          <span onClick={this.changeName}>Confirm</span>
        </div>
      </div>
    );
    this.props.openModal(modalContent);
  };

  changeName = () => {
    const name = this.name.value;
    const id = this.props.contactItem.id;
    this.props.onChangeName(id, name, () => {
      //console.log('change name');
    });
    this.props.closeModal();
  };

  render() {
    const { contactItem, onInfo, onMessage, onCall, onDelete, toolTipPosition,
      openModal, closeModal } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
          toolTipPosition={toolTipPosition}
          borderRadius="0"
          buttons
        >
        <MenuLeft
          contactItem={contactItem.id}
          onInfo={onInfo}
          onMessage={onMessage}
          onCall={onCall}
        />
        <MenuRight
          contactItem={contactItem}
          onEdit={this.showEdit}
          onDelete={onDelete}
          openModal={openModal}
          closeModal={closeModal}
        />
        </Avatar>
      </li>
    );
  }
}

Contacts.propTypes = {
  contactItem: PropTypes.object,
  onInfo: PropTypes.func,
  onMessage: PropTypes.func,
  onCall: PropTypes.func,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func,
  toolTipPosition: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};