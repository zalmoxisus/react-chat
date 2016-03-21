import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ContactList from 'react-chat/ContactList';
import testContacts from './testContacts';

const me = {
  id: '2',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};

class Container extends Component {
  state = {
    contacts: testContacts,

    delete(contact) {
      this.contacts.forEach((item, index, object) => {
        if (item.id === contact) {
          object.splice(index, 1);
        }
      });
    }
  };
  handleInfo = (id) => {
    // Add here info method
    console.log('info method');
  };

  handleMessage = (id) => {
    // Add here message method
    console.log('message method');
  };

  handleCall = (id) => {
    // Add here call method
    console.log('call method');
  };

  handleChangeName = (id, name, success) => {
    // Add here edit name method
    success();
  };

  handleDelete = (contact, success) => {
    // Add here delete method
    this.state.delete(contact);
    this.setState(this.state);
    success();
  };

  render() {
    return (
      <ContactList
        listContacts={testContacts}
        onInfo={this.handleInfo}
        onMessage={this.handleMessage}
        onCall={this.handleCall}
        onChangeName={this.handleChangeName}
        onDelete={this.handleDelete}
      />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
