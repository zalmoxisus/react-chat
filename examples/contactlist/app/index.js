import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import './style.scss';
import ContactList from './ContactList';
import ModalDialog from './ModalDialog';
import testContacts from './testContacts';
import ChatStore from './store/ChatStore';
import AppStore from './store/AppStore';

useStrict(true);

const chatStore = ChatStore.fromJS(testContacts || []);
const appStore = new AppStore();

@observer
class Container extends Component {

  render() {
    return (
      <div>
        <ModalDialog
          content={appStore.modal}
          onClose={appStore.closeModal}
        />
        <Provider chatStore={chatStore} appStore={appStore}>
          <ContactList />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
