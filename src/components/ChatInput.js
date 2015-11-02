import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';

export default () => (
  <div>
    <TextareaAutosize className={styles.usermsg} autoFocus />
  </div>
);
