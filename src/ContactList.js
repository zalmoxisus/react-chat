import React, { Component, PropTypes } from 'react';
import styles from './ContactList.css';
import MdPeople from 'react-icons/lib/md/people';
import Contacts from './components/Contacts';

export default class ContactList extends Component {
  render() {
    const { listContacts, onInfo, onMessage, onCall, onChangeName, onDelete } = this.props;
    return (
      <div className={styles.contactlist}>
        <div className={styles.headerlist}>
          <MdPeople />
          <span>CONTACT LIST</span>
        </div>
        <ul>
          {
            listContacts.map(contact =>
              <Contacts key={contact.id}
                contactItem={contact}
                onInfo={onInfo}
                onMessage={onMessage}
                onCall={onCall}
                onChangeName={onChangeName}
                onDelete={onDelete}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = {
  listContacts: PropTypes.array,
  onInfo: PropTypes.func,
  onMessage: PropTypes.func,
  onCall: PropTypes.func,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func
};