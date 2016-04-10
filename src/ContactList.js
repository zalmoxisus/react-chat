import React, { Component, PropTypes } from 'react';
import styles from './contactlist.scss';
import Contacts from './components/Contacts';

export default class ContactList extends Component {
  render() {
    const { listContacts, onInfo, onMessage, onCall, onChangeName, onDelete,
      toolTipPosition, openModal, closeModal } = this.props;
    return (
      <div className={styles.contactlist}>
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
                toolTipPosition={toolTipPosition}
                openModal={openModal}
                closeModal={closeModal}
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
  onDelete: PropTypes.func,
  toolTipPosition: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};