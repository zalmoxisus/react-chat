import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import Avatar from 'react-chat/components/Avatar';
import styles from './contactlist.scss';
import UserMenu from './UserMenu';

@inject('chatStore', 'chatViewStore')
export default class Contact extends Component {
  render() {
    const { chatStore, chatViewStore, contactItem,
      openModal, closeModal } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
          toolTipPosition={chatViewStore.toolTipPosition}
          borderRadius={0}
        >
          <UserMenu
            chatStore={chatStore}
            chatViewStore={chatViewStore}
            contactItem={contactItem}
            openModal={openModal}
            closeModal={closeModal}
          />
        </Avatar>
      </li>
    );
  }
}

Contact.propTypes = {
  chatStore: PropTypes.object,
  chatViewStore: PropTypes.object,
  contactItem: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
