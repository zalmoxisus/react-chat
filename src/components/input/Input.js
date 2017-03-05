import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../../chat.scss';

export default class Input extends Component {
  getRef = (node) => {
    this.input = node;
    this.props.inputRef(node);
  };

  send = (e) => {
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const text = e.target.value.trim();
    if (text === '') return;
    this.props.onSend({ text });
    this.input.value = '';
    this.props.onInputTextChanged('');
  };

  render() {
    const { onInputTextChanged } = this.props;
    return (
      <TextareaAutosize
        autoFocus
        ref={this.getRef}
        className={styles.usermsg}
        onKeyPress={this.send}
        onChange={onInputTextChanged}
      />
    );
  }
}

Input.propTypes = {
  onSend: PropTypes.func,
  onInputTextChanged: PropTypes.func,
  inputRef: PropTypes.func.isRequired
};
