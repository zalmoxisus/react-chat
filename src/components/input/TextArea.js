import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../../chat.scss';

export default class TextArea extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.inputValue !== this.props.inputValue) {
      if (!this.fromInput) {
        this.usermsg.focus();
      }
      this.fromInput = false;
    }
  }
  mapRef = (node) => {
    this.usermsg = node;
  };
  changeValue = (e) => {
    this.props.changeInpValue(e.target.value);
    this.fromInput = true;
  };

  render() {
    const { inputValue, sendMsg } = this.props;
    return (<TextareaAutosize autoFocus
      ref={this.mapRef}
      className={styles.usermsg}
      onKeyPress={sendMsg}
      value={inputValue}
      onChange={this.changeValue}
    />
    );
  }
}

TextArea.propTypes = {
  changeInpValue: PropTypes.func,
  sendMsg: PropTypes.func,
  inputValue: PropTypes.string
};
