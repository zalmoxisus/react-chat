import React, { Component, PropTypes } from 'react';
import styles from './contactlist.scss';
import Contact from './Contact';
import { inject } from 'mobx-react';

@inject('chatStore')
export default class ContactList extends Component {
  render() {
    const { chatStore, toolTipPosition, openModal, closeModal } = this.props;
    return (
      <div className={styles.contactlist}>
        <ul>
          {
            chatStore.listContacts.map(contact =>
              <Contact key={contact.id}
                contactItem={contact}
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
  chatStore: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};

