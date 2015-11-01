import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default () => (
  <div>
    <textarea className={styles.usermsg} autoFocus></textarea>
  </div>
);
