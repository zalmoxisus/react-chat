import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default({messages}) => (
  <div>
    <div className={styles.base}>
      <ChatArea messages={messages} />
      <ChatInput messages={messages} />
    </div>
  </div>
);
