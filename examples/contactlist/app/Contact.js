import React, { Component, PropTypes } from 'react';
import styles from './contactlist.scss';
import Avatar from 'react-chat/components/Avatar';
import UserMenu from './UserMenu';

export default class Contact extends Component {
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
          borderRadius={0}
        >
          <UserMenu
            contactItem={contactItem.id}
            onInfo={onInfo}
            onMessage={onMessage}
            onCall={onCall}
            onDelete={onDelete}
            openModal={openModal}
            closeModal={closeModal}
          />
        </Avatar>
      </li>
    );
  }
}

Contact.propTypes = {
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
