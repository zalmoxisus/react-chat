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
    submenuShow: PropTypes.bool,
    lng: PropTypes.string,
    onTranslate: PropTypes.func
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
      menuBtn.style.boxShadow = 'none';
      e.currentTarget.addEventListener('mouseleave', function() {
        menuTimer = setTimeout(function() {
          menuBtn.style.transform = 'rotate(0deg)';
          menuBtn.style.boxShadow = '0 -1px 1px rgba(5, 5, 5, 0.3)';
          that.setState({ menuShow: false });
        }, 1000);
      });
      e.currentTarget.addEventListener('mouseenter', function() {
        clearTimeout(menuTimer);
      });
    } else {
      menuBtn.style.transform = 'rotate(0deg)';
      menuBtn.style.boxShadow = '0 -1px 1px rgba(5, 5, 5, 0.3)';
    }
  };

  hideEmoticons = (e) => {
    let emoticonBtn = this.emoticonsBtn;
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
    } else if ((e.target.parentNode.className !== styles.categoryBtns) && (e.target.parentNode.className !== styles.categoryBtn)) {
      this.setState({ emoticonShow: !this.state.emoticonShow });
      emoticonBtn.style.transform = 'rotate(0deg)';
    }
  };

  addTranslation = (e) => {
    this.addStr(e);
    this.setState({ menuShow: false });
  };
  addStr = (e) => {
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
          <UserMenu
            menuShow={this.state.menuShow}
            submenuShow={this.props.submenuShow}
            addTranslation={this.addTranslation}
            onMessage={this.props.onMessage}
            lng={this.props.lng}
            onTranslate={this.props.onTranslate}
          />
        </div>
        <TextareaAutosize ref={(ref) => this.usermsg = ref} className={styles.usermsg} autoFocus onKeyPress={
      function(e) {
        if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
        e.preventDefault();
        const input = e.target;
        let txt = input.value;
        txt = txt.replace(/[\t ]+/g, ' ');
        if ((txt === '') || (txt === ' ') || (txt === '\n')) {
          e.target.style.height = '26px';
          e.target.value = '';
          return;
        }
        onMessage({ txt: txt }, function success() {
          input.value = '';
        });
      }
      }/>
        <div className={styles.emoticonsContainer} onClick={this.hideEmoticons}>
          <div ref={(ref) => this.emoticonsBtn = ref} className={styles.emoticonsBtn} onMouseOver={this.btnHovered}> {emojify(' :) ')}</div>
          <ToggleDisplay show={this.state.emoticonShow}>
            <EmojiCategories addEmoticon={this.addStr} />
          </ToggleDisplay>
        </div>
      </div>
    );
  }
}
