import React, { PureComponent, Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

export default class Chat extends Component {
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
      onTranslate, translateLanguages, lang, UserMenu, nativeLng, handleModal, voices,
      ban, manageMessage
    } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          {...{
            messages, user, showAvatars, avatarPreviewPosition, UserMenu, onTranslate,
            translateLanguages, nativeLng, handleModal, voices, ban, manageMessage,
            updateInputValue: this.updateInputValue
          }}
        />
        <ChatInput
          {...{ onSend, onInputTextChanged, onTranslate, translateLanguages, lang }}
          inputRef={this.getInputRef}
          inputValue={this.inputValue}
          setInputValue={this.setInputValue}
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
  onInputTextChanged: () => {},
  handleModal: () => {}
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
  nativeLng: PropTypes.string,
  UserMenu: PropTypes.any,
  handleModal: PropTypes.func,
  voices: PropTypes.array,
  manageMessage: PropTypes.func,
  ban: PropTypes.func
};
