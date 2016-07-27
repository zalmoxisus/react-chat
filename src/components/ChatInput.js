import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import TextareaAutosize from 'react-textarea-autosize';
import MessageMenu from './inputMenus/MessageMenu';
import emojify from '../utils/emojify';
import EmojiCategories from './inputMenus/EmojiCategories';
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import { observer, inject } from 'mobx-react';

@inject('chatStore', 'chatViewStore') @observer
export default class ChatInput extends Component {
  mapRefTextarea = (node) => {
    this.usermsg = node;
  };

  toggleMenu = (e, menu) => {
    let menuTimer = 0;
    e.currentTarget.addEventListener('mouseleave', () => {
      menuTimer = setTimeout(() => {
        if (menu === 1) {
          this.props.chatViewStore.menu(false);
        } else {
          this.props.chatViewStore.emoticon(false);
        }
      }, 1000);
    });
    e.currentTarget.addEventListener('mouseenter', () => {
      clearTimeout(menuTimer);
    });
  };

  toggleUmenu = (e) => {
    if ((e.target.parentNode.className === styles.btnContainer) ||
      ((e.target.tagName === 'INPUT'))) {
      this.props.chatViewStore.menu(false);
      return;
    }
    this.props.chatViewStore.menu(!this.props.chatViewStore.menuShow);
    if (!this.props.chatViewStore.menuShow) {
      this.toggleMenu(e, 1);
    }
  };
  toggleEmoticons = (e) => {
    if ((e.target.parentNode.className !== styles.categoryBtns) &&
      (e.target.parentNode.className !== styles.categoryBtn)) {
      this.props.chatViewStore.emoticon(!this.props.chatViewStore.emoticonShow);
      if (this.props.chatViewStore.emoticonShow) {
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
    this.props.chatStore.send({ txt }, () => {
      input.value = '';
    });
  };

  addTranslation = (e) => {
    this.addStr(e);
    this.props.chatViewStore.menu(false);
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
    const { translateLanguages, submenuShow, lang } = this.props;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.toggleUmenu}>
          <MdKeyboardArrowUp
            className={(this.props.chatViewStore.menuShow) ? styles.arrowUp : styles.arrowUpRotate}
          />
          <MessageMenu
            submenuShow={submenuShow}
            addTranslation={this.addTranslation}
            lang={lang}
            translateLanguages={translateLanguages}
          />
        </div>
        <TextareaAutosize autoFocus
          ref={this.mapRefTextarea}
          className={styles.usermsg}
          onKeyPress={this.sendMsg}
        />
        <div className={styles.emoticonsContainer} onClick={this.toggleEmoticons}>
          <div
            className={(!this.props.chatViewStore.emoticonShow) ?
             styles.emoticonsBtn : styles.emoticonsRotate}
            onMouseOver={this.btnHovered}
          >
            {emojify(' :) ')}
          </div>
          <EmojiCategories addEmoticon={this.addStr} />
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  chatStore: PropTypes.object,
  chatViewStore: PropTypes.object,
  submenuShow: PropTypes.bool,
  lang: PropTypes.string,
  translateLanguages: PropTypes.array
};
