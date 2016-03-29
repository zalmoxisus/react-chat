import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import TextareaAutosize from 'react-textarea-autosize';
import UserMenu from './inputMenus/UserMenu';
import emojify from '../utils/emojify';
import EmojiCategories from './inputMenus/EmojiCategories';
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';

export default class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emoticonShow: false,
      menuShow: false
    };
  }

  mapRefTextarea = (node) => {
    this.usermsg = node;
  };

  toggleMenu = (e, menu) => {
    let menuTimer = 0;
    e.currentTarget.addEventListener('mouseleave', () => {
      menuTimer = setTimeout(() => {
        if (menu === 1) {
          this.setState({ menuShow: false });
        } else {
          this.setState({ emoticonShow: false });
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
      this.setState({ menuShow: false });
      return;
    }
    this.setState({ menuShow: !this.state.menuShow });
    if (!this.state.menuShow) {
      this.toggleMenu(e, 1);
    }
  };
  toggleEmoticons = (e) => {
    if ((e.target.parentNode.className !== styles.categoryBtns) &&
      (e.target.parentNode.className !== styles.categoryBtn)) {
      this.setState({ emoticonShow: !this.state.emoticonShow });
      if (!this.state.emoticonShow) {
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
    this.props.onSend({ txt }, () => {
      input.value = '';
    });
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
    const { onSend, onTranslate, translateLanguages, submenuShow, lang } = this.props;
    return (<div className={styles.chatInpContainer}>
        <div className={styles.chatOptions} onClick={this.toggleUmenu}>
          <MdKeyboardArrowUp
            className={(this.state.menuShow) ? styles.arrowUp : styles.arrowUpRotate}
          />
          <UserMenu
            menuShow={this.state.menuShow}
            submenuShow={submenuShow}
            addTranslation={this.addTranslation}
            onSend={onSend}
            lang={lang}
            onTranslate={onTranslate}
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
            className={(!this.state.emoticonShow) ? styles.emoticonsBtn : styles.emoticonsRotate}
            onMouseOver={this.btnHovered}
          >
            {emojify(' :) ')}
          </div>
          <EmojiCategories addEmoticon={this.addStr} emoticonShow={this.state.emoticonShow} />
        </div>
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSend: PropTypes.func,
  submenuShow: PropTypes.bool,
  lang: PropTypes.string,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array
};
