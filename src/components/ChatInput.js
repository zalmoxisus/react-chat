import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import TextareaAutosize from 'react-textarea-autosize';
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import styles from '../chat.scss';
import MessageMenu from './inputMenus/MessageMenu';
import emojify from '../utils/emojify';
import EmojiCategories from './inputMenus/EmojiCategories';

@observer(['chatStore', 'appStore'])
export default class ChatInput extends Component {
  mapRefTextarea = (node) => {
    this.usermsg = node;
  };

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

  sendMsg = (e) => {
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const input = e.target;
    let txt = input.value;
    txt = txt.trim();
    if (txt === '') return;
    const me = this.props.appStore.me;
    this.props.chatStore.send({ txt }, me, () => {
      input.value = '';
    });
  };

  addTranslation = (e) => {
    this.addStr(e);
    this.props.chatStore.menu(false);
  };
  addStr = (e) => {
    let node = this.usermsg;
    node.value = node.value + e + ' ';
    node.focus();
  };

  btnHovered = (e) => {
    e.currentTarget.children[0].removeAttribute('title');
  };

  render() {
    const { chatStore, appStore } = this.props;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.toggleUmenu}>
          <MdKeyboardArrowUp
            className={(chatStore.menuShow) ? styles.arrowUp : styles.arrowUpRotate}
          />
          <MessageMenu
            chatStore={chatStore}
            appStore={appStore}
            addTranslation={this.addTranslation}
          />
        </div>
        <TextareaAutosize autoFocus
          ref={this.mapRefTextarea}
          className={styles.usermsg}
          onKeyPress={this.sendMsg}
        />
        <div className={styles.emoticonsContainer} onClick={this.toggleEmoticons}>
          <div
            className={(!chatStore.emoticonShow) ?
             styles.emoticonsBtn : styles.emoticonsRotate}
            onMouseOver={this.btnHovered}
          >
            {emojify(' :) ')}
          </div>
          <EmojiCategories addEmoticon={this.addStr} chatStore={chatStore} />
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object
};
