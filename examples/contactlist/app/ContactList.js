import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import styles from './contactlist.scss';
import Contact from './Contact';

@inject('contactStore', 'appStore')
export default class ContactList extends Component {
  render() {
    const { contactStore, appStore } = this.props;
    return (
      <div className={styles.contactlist}>
        <ul>
          {
            contactStore.contactList.map(contact =>
              <Contact key={contact.id}
                contactItem={contact}
                contactStore={contactStore}
                appStore={appStore}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  appStore: PropTypes.object,
  contactStore: PropTypes.object
};

