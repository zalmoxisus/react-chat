import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import './style.scss';
import ContactList from './ContactList';
import ModalDialog from './ModalDialog';
import testContacts from './testContacts';
import ChatStore from './store/ChatStore';

useStrict(true);

const chatStore = new ChatStore();

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
    chatStore.testContacts = testContacts;
  }

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
        <Provider chatStore={chatStore}>
          <ContactList
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
