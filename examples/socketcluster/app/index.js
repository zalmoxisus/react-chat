import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import './style.scss';
import UserMenu from './UserMenu';
import store from './store/Store';
import ModalDialog from './ModalDialog';
import translateLanguages from './translateLanguages';

useStrict(true);

store.getUserdata(translateLanguages);
store.getLanguages(translateLanguages);

@observer
class Container extends Component {

  componentDidMount() {
    store.connect();
  }

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
