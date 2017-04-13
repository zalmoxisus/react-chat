import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react';
import Chat from 'react-chat';
import './style.scss';
import Store from './store/Store';

useStrict(true);
const chatStore = new Store();

@observer
class Container extends Component {
  render() {
    return (
      <Chat
        user={chatStore.user}
        messages={chatStore.messages.toJS()}
        onSend={chatStore.onSend}
      />
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
