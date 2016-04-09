import React, { Component, PropTypes } from 'react';
import styles from '../contactlist.scss';
import Avatar from './Avatar';
import MenuLeft from './contacts/MenuLeft';
import MenuRight from './contacts/MenuRight';

export default class Contacts extends Component {
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