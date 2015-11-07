import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';

export default ({addMessages}) => (
  <TextareaAutosize className={styles.usermsg} autoFocus onKeyPress={
    function _onEnter(e){
        if (e.nativeEvent.keyCode != 13 || e.shiftKey) return;
        e.preventDefault();
        var input = e.target;
        var text = input.value;
        if (text === "") return;
        addMessages(e);
      }
    } />
);
