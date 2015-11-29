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
    let iconMenu = document.getElementById('iconMenu');
    if (node.style.visibility === 'hidden') {
      iconMenu.className = 'icon-keyboard-arrow-up';
      node.style.visibility = 'visible';
    } else {
      iconMenu.className = 'icon-keyboard-arrow-down';
      node.style.visibility = 'hidden';
    }
  };
  render() {
    const onMessage = this.props.onMessage;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.hideMenu}>
          <UserMenu/>
          <div id="iconMenu" className="icon-keyboard-arrow-down"></div>
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
