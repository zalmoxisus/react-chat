import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';
import ChatStore from './stores/ChatStore';
import { Provider } from 'mobx-react';

const chatStore = new ChatStore();

export default class Chat extends Component {
  render() {
    return (
      <Provider chatStore={chatStore}>
        <div className={styles.base}>
          <ChatArea UserMenu={this.props.UserMenu} />
          <ChatInput />
        </div>
      </Provider>
    );
  }
}

Chat.propTypes = {
  UserMenu: PropTypes.func
};
