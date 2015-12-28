import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './UserMenu';
import ToggleDisplay from '../utils/ToggleDisplay';
import emojify from '../utils/emojify';
import EmojiCategories from './EmojiCategories';

export default class ChatInput extends Component {
  static propTypes = {
    onMessage: PropTypes.func,
    submenuShow: PropTypes.bool
  };
  state = {
    emoticonShow: false,
    menuShow: false
  };

  hideMenu = (e) => {
    let menuBtn = this.iconMenu;
    if ((e.target.tagName === 'P') || ((e.target.tagName === 'INPUT'))) {
      this.setState({ menuShow: false });
      return;
    }
    this.setState({ menuShow: !this.state.menuShow });
    if (this.state.menuShow === false) {
      let menuTimer = 0;
      const that = this;
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
    }
  };

  hideEmoticons = (e) => {
    let emoticonBtn = e.target;
    if (this.state.emoticonShow === false) {
      this.setState({ emoticonShow: !this.state.emoticonShow });
      let menuTimer = 0;
      const that = this;
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
      this.setState({ emoticonShow: !this.state.emoticonShow });
      emoticonBtn.style.transform = 'rotate(0deg)';
    }
  };

  addEmoticon = (e) => {
    let node = this.usermsg;
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
          <div className="icon-keyboard-arrow-down" ref={(ref) => this.iconMenu = ref}></div>
          <UserMenu menuShow={this.state.menuShow} submenuShow={this.props.submenuShow} onMessage={this.props.onMessage}/>
        </div>
        <TextareaAutosize ref={(ref) => this.usermsg = ref} className={styles.usermsg} autoFocus onKeyPress={
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
          <div id="emoticonBtn" className={styles.emoticonsBtn} onMouseOver={this.btnHovered}> {emojify(' :) ')}</div>
          <ToggleDisplay show={this.state.emoticonShow}>
            <EmojiCategories addEmoticon={this.addEmoticon} />
          </ToggleDisplay>
        </div>
      </div>
    );
  }
}
