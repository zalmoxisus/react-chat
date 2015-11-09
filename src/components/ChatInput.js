import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';

export default ({onMessage}) => (
  <TextareaAutosize className={styles.usermsg} autoFocus onKeyPress={
    function(e) {
      if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
      e.preventDefault();
      const input = e.target;
      const txt = input.value;
      if (txt === '') return;
      onMessage({ txt: txt }, function success() {
        input.value = '';
      });
    }
  } />
);
