import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import style from './style.scss';
import UserMenu from './UserMenu';
import ChatStore from './store/ChatStore';
import AppStore from './store/AppStore';
import ContactStore from './store/ContactStore';
import ModalDialog from './ModalDialog';
import translateLanguages from './translateLanguages';

useStrict(true);

const hash = window.location.hash ? window.location.hash.substr(1) : '1';
const data = {
  bosh: 'https://xmpp.jix.im/http-bind',
  name: 'react' + hash,
  jid: `react${hash}@jix.im`,
  password: 'react1react1react1',
  muc: 'reactchat@muc.jix.im'
};

let conn;

@observer
class Container extends Component {

  render() {
    return (
      <div>
        <ModalDialog
          content={appStore.modal}
          onClose={appStore.closeModal}
        />
        <Provider
          chatStore={chatStore} appStore={appStore}
          contactStore={contactStore} UserMenu={UserMenu}>
          <Chat />
        </Provider>
      </div>
    );
  }
}

function init() {
  ReactDOM.render(<Container />, document.getElementById('root'));
}

conn = new Strophe.Connection(data.bosh);
conn.connect(data.jid, data.password, function (status) {
  console.log('status', status);
  if (status === Strophe.Status.CONNECTED) {
    console.log('connected');
    init();
  } else if (status === Strophe.Status.DISCONNECTED) {
    console.log('disconnected');
  }
});

const chatStore = new ChatStore({ translateLanguages, conn, data });
const appStore = new AppStore({
  me: {
    id: data.name,
    name: data.name
  }
});
const contactStore = new ContactStore();
