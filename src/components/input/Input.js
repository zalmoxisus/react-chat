import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import ChatArea from './TextArea';

@observer
export default class Input extends Component {
  sendMsg = (e) => {
    const { chatStore, appStore } = this.props;
    const me = appStore.me;
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const input = e.target;
    let txt = input.value;
    txt = txt.trim();
    if (txt === '') return;
    chatStore.send({ txt }, me, () => {
      input.value = '';
      chatStore.changeInpValue(e.target.value);
    });
  };
  render() {
    const { chatStore } = this.props;
    return (<ChatArea
      changeInpValue={chatStore.changeInpValue}
      sendMsg={this.sendMsg}
      inputValue={chatStore.inputValue}
    />
    );
  }
}

Input.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object
};
