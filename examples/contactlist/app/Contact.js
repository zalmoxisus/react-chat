import React, { Component, PropTypes } from 'react';
import styles from './contactlist.scss';
import Avatar from 'react-chat/components/Avatar';
import UserMenu from './UserMenu';
import { inject } from 'mobx-react';

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
