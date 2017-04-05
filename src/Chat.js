import React, { PureComponent, Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

export default class Chat extends (PureComponent || Component) {
  getInputRef = (node) => {
    this.input = node;
    if (this.props.inputRef) this.props.inputRef(node);
  };

  inputValue = () => this.input;
  setInputValue = (val) => {
    this.input.value = val;
  };

  updateInputValue = fn => {
    const input = this.input;
    input.value = fn(input.value);
    input.focus();
  };

  render() {
    const {
      messages, user, showAvatars, avatarPreviewPosition, onSend, onInputTextChanged,
      onTranslate, translateLanguages, lang, UserMenu
    } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          {...{
            messages, user, showAvatars, avatarPreviewPosition, UserMenu,
            updateInputValue: this.updateInputValue
          }}
        />
        <ChatInput
          {...{ onSend, onInputTextChanged }}
          inputRef={this.getInputRef}
          inputValue={this.inputValue}
          setInputValue={this.setInputValue}
          onTranslate={onTranslate}
          translateLanguages={translateLanguages}
          lang={lang}
        />
      </div>
    );
  }
}

Chat.defaultProps = {
  messages: [],
  user: {},
  showAvatars: true,
  avatarPreviewPosition: 'right',
  onSend: () => {},
  onInputTextChanged: () => {}
};

Chat.propTypes = {
  messages: PropTypes.array,
  user: PropTypes.shape({
    _id: PropTypes.any
  }),
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string,
  onSend: PropTypes.func,
  onInputTextChanged: PropTypes.func,
  inputRef: PropTypes.func,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array,
  lang: PropTypes.string,
  UserMenu: PropTypes.any
};
