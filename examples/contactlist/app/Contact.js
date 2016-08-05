import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import Avatar from 'react-chat/components/Avatar';
import styles from './contactlist.scss';
import UserMenu from './UserMenu';

@inject('chatStore', 'appStore')
export default class Contact extends Component {
  render() {
    const { chatStore, contactItem } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
          toolTipPosition={chatStore.toolTipPosition}
          borderRadius={0}
        >
          <UserMenu {...this.props} />
        </Avatar>
      </li>
    );
  }
}

Contact.propTypes = {
  chatStore: PropTypes.object,
  appStore: PropTypes.object,
  contactItem: PropTypes.object
};
