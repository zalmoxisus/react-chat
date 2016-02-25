import React, { Component, PropTypes } from 'react';
import styles from './ContactList.css';
import MdPeople from 'react-icons/lib/md/people';
import Contacts from './components/Contacts';

export default class ContactList extends Component {
  static propTypes = {
    listContacts: PropTypes.array,
    onInfo: PropTypes.func,
    onMessage: PropTypes.func,
    onCall: PropTypes.func,
    onChangeName: PropTypes.func
  };
  render() {
    const { listContacts, onInfo, onMessage, onCall, onChangeName } = this.props;
    return (
      <div className={styles.contactlist}>
        <div className={styles.headerlist}>
          <MdPeople/>
          <span>CONTACT LIST</span>
        </div>
        <ul>
          {
            listContacts.map(contact => {
              return (
                <Contacts key={contact.id}
                  contactItem={contact}
                  onInfo={onInfo}
                  onMessage={onMessage}
                  onCall={onCall}
                  onChangeName={onChangeName}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }
}
