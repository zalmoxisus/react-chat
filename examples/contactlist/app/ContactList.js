import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styles from './contactlist.scss';
import Contact from './Contact';

@inject('store')
export default class ContactList extends Component {
  render() {
    const { store } = this.props;
    return (
      <div className={styles.contactlist}>
        <ul>
          {
            store.contactList.map(contact =>
              <Contact key={contact.id}
                contactItem={contact}
                store={store}
              />
            )
          }
        </ul>
      </div>
    );
  }
}


