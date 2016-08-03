import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import styles from './contactlist.scss';
import Contact from './Contact';

@inject('chatStore')
export default class ContactList extends Component {
  render() {
    const { chatStore } = this.props;
    return (
      <div className={styles.contactlist}>
        <ul>
          {
            chatStore.contactList.map(contact =>
              <Contact key={contact.id}
                contactItem={contact}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  chatStore: PropTypes.object
};

