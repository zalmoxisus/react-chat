import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ContactList from 'react-chat/ContactList';
import testContacts from './testContacts';

class Container extends Component {

  handleInfo = () => {
    // Add here info method
    console.log('info method');
  };

  handleMessage = () => {
    // Add here message method
    console.log('message method');
  };

  handleCall = () => {
    // Add here call method
    console.log('call method');
  };

  render() {
    return (
      <ContactList
        listContacts={testContacts}
        onInfo={this.handleInfo}
        onMessage={this.handleMessage}
        onCall={this.handleCall}
      />
    );
  }
}

ReactDOM.render(<Container/>, document.getElementById('root'));
