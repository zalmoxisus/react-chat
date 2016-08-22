import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../../chat.scss';

export default class TextArea extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.inputValue !== this.props.inputValue) {
      if (document.activeElement !== this.usermsg) {
        this.usermsg.focus();
      }
    }
  }
  mapRef = (node) => {
    this.usermsg = node;
  };
  changeValue = (e) => {
    this.props.changeInpValue(e.target.value);
  };
  sendMsg = (e) => {
    const { me, sendMsg, changeInpValue } = this.props;
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const input = e.target;
    let txt = input.value;
    txt = txt.trim();
    if (txt === '') return;
    sendMsg.send({ txt }, me, () => {
      input.value = '';
      changeInpValue('');
    });
  };

  render() {
    const { inputValue } = this.props;
    return (<TextareaAutosize autoFocus
      ref={this.mapRef}
      className={styles.usermsg}
      onKeyPress={this.sendMsg}
      value={inputValue}
      onChange={this.changeValue}
    />
    );
  }
}

TextArea.propTypes = {
  me: PropTypes.string,
  changeInpValue: PropTypes.func,
  sendMsg: PropTypes.func,
  inputValue: PropTypes.string
};
