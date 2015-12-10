import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './UserMenu';
import {emojify} from 'react-emojione';
import EmojiCategories from './EmojiCategories';

export default class ChatInput extends Component {
  static propTypes = {
    onMessage: PropTypes.func,
    emoticonShow: PropTypes.bool,
    menuShow: PropTypes.bool
  };
  state = {
    emoticonShow: false,
    menuShow: false
  };

  hideMenu = (e) => {
    let menuBtn = this.iconMenu;
    if (this.state.menuShow === false) {
      let menuTimer = 0;
      const that = this;
      this.setState({ menuShow: true });
      menuBtn.style.transform = 'rotate(180deg)';
      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          menuBtn.style.transform = 'rotate(0deg)';
          that.setState({ menuShow: false });
        }, 1000);
      });
      e.currentTarget.addEventListener('mouseenter', function() {
        clearTimeout(menuTimer);
      });
    } else {
      menuBtn.style.transform = 'rotate(0deg)';
      this.setState({menuShow: false});
    }
  };

  hideEmoticons = (e) => {
    let emoticonBtn = e.target;
    if (this.state.emoticonShow === false) {
      let menuTimer = 0;
      const that = this;
      this.setState({ emoticonShow: true });
      emoticonBtn.style.transform = 'rotate(180deg)';
      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          emoticonBtn.style.transform = 'rotate(0deg)';
          that.setState({ emoticonShow: false });
        }, 1000);
      });
      e.currentTarget.addEventListener('mouseenter', function() {
        clearTimeout(menuTimer);
      });
    } else if (e.target.parentNode.className === styles.emoticonsBtn) {
      emoticonBtn.style.transform = 'rotate(0deg)';
      this.setState({emoticonShow: false});
    }
  };

  addEmoticon = (e) => {
    let node = document.getElementsByTagName('textarea')[0];
    node.value = node.value + e + ' ';
    node.focus();
  };

  btnHovered = (e) => {
    e.currentTarget.querySelectorAll('span')[2].removeAttribute('title');
  };

  render() {
    const onMessage = this.props.onMessage;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.hideMenu}>
          { this.state.menuShow ? <UserMenu/> : null }
          <div id="iconMenu" className="icon-keyboard-arrow-down" ref={(ref) => this.iconMenu = ref}></div>
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
          <div className={styles.emoticonsBtn} onMouseOver={this.btnHovered}> {emojify(' :) ')}</div>
          { this.state.emoticonShow ? <EmojiCategories addEmoticon={this.addEmoticon} /> : null }
        </div>
      </div>
    );
  }
}
