import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import ContactList from 'react-chat/ContactList';
import testContacts from './testContacts';
import ModalDialog from './ModalDialog';

const toolTipPosition = 'right';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: testContacts,

      delete(contact) {
        this.contacts.forEach((item, index, object) => {
          if (item.id === contact) {
            object.splice(index, 1);
          }
        });
      },
      modal: null
    };
  }
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

  handleDelete = (contact, success) => {
    // Add here delete method
    this.state.delete(contact);
    this.setState(this.state);
    success();
  };

  closeModal = () => {
    this.setState({ modal: null });
  };

  openModal = (modalContent) => {
    this.setState({ modal: modalContent });
  };

  render() {
    return (
      <div>
        <ModalDialog
          content={this.state.modal}
          onClose={this.closeModal}
        />
        <ContactList
          listContacts={testContacts}
          onInfo={this.handleInfo}
          onMessage={this.handleMessage}
          onCall={this.handleCall}
          onDelete={this.handleDelete}
          toolTipPosition={toolTipPosition}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
