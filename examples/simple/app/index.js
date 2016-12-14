import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import store from './store/Store';
import Chat from 'react-chat';
import './style.scss';
import ModalDialog from './ModalDialog';
import UserMenu from './UserMenu';
import testMessages from './testMessages';
import translateLanguages from './translateLanguages';

useStrict(true);

// Emulate fetching messages
setTimeout(() => { store.addMessages(testMessages); });
store.getLanguages(translateLanguages);

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
        <Provider
          store={store}
        >
          <Chat UserMenu={UserMenu} />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
