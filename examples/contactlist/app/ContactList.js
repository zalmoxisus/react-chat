import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import styles from './contactlist.scss';
import Contact from './Contact';

@inject('contactStore')
export default class ContactList extends Component {
  render() {
    const { contactStore } = this.props;
    return (
      <div className={styles.contactlist}>
        <ul>
          {
            contactStore.contactList.map(contact =>
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
  contactStore: PropTypes.object
};

