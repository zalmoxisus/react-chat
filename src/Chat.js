import React, { Component } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

export default class Chat extends Component {
  render() {
    return (
      <div className={styles.base}>
        <ChatArea />
        <ChatInput />
      </div>
    );
  }
}
