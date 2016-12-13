import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import './style.scss';
import ContactList from './ContactList';
import ModalDialog from './ModalDialog';
import testContacts from './testContacts';
import store from './store/Store';

useStrict(true);

@observer
class Container extends Component {

  render() {
    return (
      <div>
        {
          store.modal &&
          <ModalDialog
            store={store}
          />
        }
        <Provider store={store}>
          <ContactList />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
