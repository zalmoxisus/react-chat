import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default({ messages = [], onMessage = [] }) => (
  <div>
    <div className={styles.base}>
      <ChatArea messages={messages} />
      <ChatInput onMessage={onMessage} />
    </div>
  </div>
);
