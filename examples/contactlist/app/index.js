import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import ContactList from './ContactList';
import ModalDialog from './ModalDialog';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import ChatStore from './store/ChatStore';
import ChatViewStore from './store/ChatViewStore';

useStrict(true);

const chatStore = new ChatStore();
const chatViewStore = new ChatViewStore();

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null
    };
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
        <Provider chatStore={chatStore} chatViewStore={chatViewStore}>
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
