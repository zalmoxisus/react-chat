import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './UserMenu';
import {emojify} from 'react-emojione';

export default class ChatInput extends Component {
  static propTypes = {
    onMessage: PropTypes.func
  };
  componentDidMount = () => {
    let node = document.getElementsByTagName('ul');
    node[0].style.visibility = 'hidden';
    node[1].style.visibility = 'hidden';
  };
  hideMenu = (e) => {
    const node = document.getElementsByTagName('ul')[0];
    const iconMenu = document.getElementById('iconMenu');
    let menuTimer = 0;
    if (node.style.visibility === 'hidden') {
      iconMenu.className = 'icon-keyboard-arrow-up';
      node.style.visibility = 'visible';

      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          iconMenu.className = 'icon-keyboard-arrow-down';
          node.style.visibility = 'hidden';
        }, 2000);
      });

      e.currentTarget.addEventListener('mouseenter', function() {
        clearTimeout(menuTimer);
      });
    } else {
      iconMenu.className = 'icon-keyboard-arrow-down';
      node.style.visibility = 'hidden';
    }
  };
  hideEmoticons = (e) => {
    const node = document.getElementsByTagName('ul')[1];
    const this_ = e.currentTarget.getElementsByTagName('span')[1];
    if (node.style.visibility === 'hidden') {
      this_.style.transform = 'rotate(180deg)';
      node.style.visibility = 'visible';
    } else {
      this_.style.transform = 'rotate(0deg)';
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
        <div className={styles.emoticons} onClick={this.hideEmoticons}>
          {emojify(' :) ')}
          <ul>
          </ul>
        </div>
      </div>
    );
  }
}
