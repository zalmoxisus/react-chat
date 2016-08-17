import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import './style.scss';
import ContactList from './ContactList';
import ModalDialog from './ModalDialog';
import testContacts from './testContacts';
import ContactStore from './store/ContactStore';
import AppStore from './store/AppStore';

useStrict(true);

const contactStore = new ContactStore({ contactList: testContacts });
const appStore = new AppStore();

@observer
class Container extends Component {

  render() {
    return (
      <div>
        <DevTools />
        <ModalDialog
          content={appStore.modal}
          onClose={appStore.closeModal}
        />
        <Provider contactStore={contactStore} appStore={appStore}>
          <ContactList />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
