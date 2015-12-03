import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './UserMenu';
import {emojify} from 'react-emojione';
import EmojiCategories from '../utils/EmojiCategories';

export default class ChatInput extends Component {
  static propTypes = {
    onMessage: PropTypes.func
  };
  componentDidMount = () => {
    let usermenu = document.getElementsByClassName(styles.usermenu)[0];
    usermenu.style.visibility = 'hidden';

    let emoticons = document.getElementsByClassName(styles.emoticons)[0];
    emoticons.style.visibility = 'hidden';
  };
  hideMenu = (e) => {
    const node = document.getElementsByClassName(styles.usermenu)[0];
    const iconMenu = document.getElementById('iconMenu');
    let menuTimer = 0;
    if (node.style.visibility === 'hidden') {
      iconMenu.className = 'icon-keyboard-arrow-up';
      node.style.visibility = 'visible';

      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          iconMenu.className = 'icon-keyboard-arrow-down';
          node.style.visibility = 'hidden';
        }, 1000);
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
    const node = document.getElementsByClassName(styles.emoticons)[0];
    const this_ = e.currentTarget.getElementsByClassName(styles.emoticonsBtn)[0];
    let menuTimer = 0;
    if (node.style.visibility === 'hidden') {
      this_.style.transform = 'rotate(180deg)';
      node.style.visibility = 'visible';

      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          this_.style.transform = 'rotate(0deg)';
          node.style.visibility = 'hidden';
        }, 1000);
      });

      e.currentTarget.addEventListener('mouseenter', function() {
        clearTimeout(menuTimer);
      });
    } else if (e.target.parentNode.className === styles.emoticonsBtn) {
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
        <div className={styles.emoticonsContainer} onClick={this.hideEmoticons}>
          <div className={styles.emoticonsBtn}> {emojify(' :) ')}</div>
          <EmojiCategories/>
        </div>
      </div>
    );
  }
}
