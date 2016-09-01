import React, { Component, PropTypes } from 'react';
import Avatar from 'react-chat/components/Avatar';
import styles from './contactlist.scss';
import UserMenu from './UserMenu';

export default class Contact extends Component {
  render() {
    const { contactStore, appStore, contactItem } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
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
  contactItem: PropTypes.object
};
