import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default({messages}) => (
  <div>
    <div className={styles.base}>{
      messages.map( message => {
        return <div key={message.id} className={styles.msgBox}>
          <ChatArea message={message} />
        </div>
      })
    }
      <ChatInput />
    </div>
  </div>
);
