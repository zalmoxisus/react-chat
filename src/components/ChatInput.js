import React, { Component, PropTypes } from 'react';
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import styles from '../chat.scss';
import MessageMenu from './input/MessageMenu';
import emojify from '../utils/emojify';
import EmojiCategories from './input/EmojiCategories';
import Input from './input/Input';

export default class ChatInput extends Component {
  toggleMenu = (e, menu) => {
    let menuTimer = 0;
    e.currentTarget.addEventListener('mouseleave', () => {
      menuTimer = setTimeout(() => {
        if (menu === 1) {
          this.props.chatStore.menu(false);
        } else {
          this.props.chatStore.emoticon(false);
        }
      }, 1000);
    });
    e.currentTarget.addEventListener('mouseenter', () => {
      clearTimeout(menuTimer);
    });
  };

  toggleUmenu = (e) => {
    const { chatStore } = this.props;
    if ((e.target.parentNode.className === styles.btnContainer) ||
      ((e.target.tagName === 'INPUT'))) {
      chatStore.menu(false);
      return;
    }
    chatStore.menu(!chatStore.menuShow);
    if (!chatStore.menuShow) {
      this.toggleMenu(e, 1);
    }
  };
  toggleEmoticons = (e) => {
    const { chatStore } = this.props;
    if ((e.target.parentNode.className !== styles.categoryBtns) &&
      (e.target.parentNode.className !== styles.categoryBtn)) {
      chatStore.emoticon(!chatStore.emoticonShow);
      if (chatStore.emoticonShow) {
        this.toggleMenu(e, 2);
      }
    }
  };

  btnHovered = (e) => {
    e.currentTarget.children[0].removeAttribute('title');
  };

  render() {
    const { onSend, onInputTextChanged, inputRef } = this.props;
    const chatStore = {}; // TODO: use state
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.toggleUmenu}>
          {/*
          <MdKeyboardArrowUp
            className={(chatStore.menuShow) ? styles.arrowUp : styles.arrowUpRotate}
          />
          <MessageMenu
            chatStore={chatStore}
          />
          */}
        </div>
        <Input onSend={onSend} onInputTextChanged={onInputTextChanged} inputRef={inputRef} />
        <div className={styles.emoticonsContainer} onClick={this.toggleEmoticons}>
          <div
            className={(!chatStore.emoticonShow) ?
             styles.emoticonsBtn : styles.emoticonsRotate}
            onMouseOver={this.btnHovered}
          >
            {emojify(' :) ')}
          </div>
          <EmojiCategories
            changeInpValue={chatStore.changeInpValue}
            inputValue={chatStore.inputValue}
            emoticonShow={chatStore.emoticonShow}
          />
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  onInputTextChanged: PropTypes.func,
  inputRef: PropTypes.func
};
