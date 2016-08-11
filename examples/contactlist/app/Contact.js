import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import Avatar from 'react-chat/components/Avatar';
import styles from './contactlist.scss';
import UserMenu from './UserMenu';

@inject('contactStore', 'appStore', 'chatStore')
export default class Contact extends Component {
  render() {
    const { contactStore, appStore, chatStore, contactItem } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
          toolTipPosition={chatStore.toolTipPosition}
          borderRadius={0}
        >
          <UserMenu
            contactStore={contactStore}
            appStore={appStore}
            contactItem={contactItem}
          />
        </Avatar>
      </li>
    );
  }
}

Contact.propTypes = {
  contactStore: PropTypes.object,
  appStore: PropTypes.object,
  chatStore: PropTypes.object,
  contactItem: PropTypes.object
};
