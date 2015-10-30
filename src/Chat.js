import React, { Component, PropTypes } from 'react';
import Message from './components/Message';
import styles from './Chat.css';

export default({messages}) => (
  <div>
    <div className={styles.base}>{
      messages.map( message => {
        return <div key={message.id} className={styles.msgBox}>
          <Message message={message} />
        </div>
      })
    }
    </div>
  </div>
);
