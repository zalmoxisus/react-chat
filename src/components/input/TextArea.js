import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../../chat.scss';

@observer
export default class TextArea extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.inputValue !== this.props.chatStore.inputValue) {
      if (document.activeElement !== this.usermsg) {
        this.usermsg.focus();
      }
    }
  }
  mapRef = (node) => {
    this.usermsg = node;
  };
  changeValue = (e) => {
    this.props.chatStore.changeInpValue(e.target.value);
  };
  sendMsg = (e) => {
    const { chatStore, appStore } = this.props;
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const input = e.target;
    let txt = input.value;
    txt = txt.trim();
    if (txt === '') return;
    const me = appStore.me;
    chatStore.send({ txt }, me, () => {
      input.value = '';
      chatStore.changeInpValue('');
    });
  };

  render() {
    const { chatStore } = this.props;
    return (<TextareaAutosize autoFocus
      ref={this.mapRef}
      className={styles.usermsg}
      onKeyPress={this.sendMsg}
      value={chatStore.inputValue}
      onChange={this.changeValue}
    />
    );
  }
}

TextArea.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object
};
