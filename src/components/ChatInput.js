import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './UserMenu';

export default class ChatInput extends Component {
  static propTypes = {
    onMessage: PropTypes.func
  };
  componentDidMount = () => {
    let node = document.getElementsByTagName('ul')[0];
    node.style.visibility = 'hidden';
  };
  hideMenu = (e) => {
    let node = document.getElementsByTagName('ul')[0];
    if (node.style.visibility === 'hidden') {
      e.target.className = 'icon-keyboard-arrow-up';
      node.style.visibility = 'visible';
    } else {
      e.target.className = 'icon-keyboard-arrow-down';
      node.style.visibility = 'hidden';
    }
  };
  render() {
    const onMessage = this.props.onMessage;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions}>
          <UserMenu/>
          <div className="icon-keyboard-arrow-down" onClick={this.hideMenu}></div>
        </div>
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
      }/>
      </div>
    );
  }
}
