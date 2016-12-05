import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import ChatArea from './TextArea';

@observer(['chatStore', 'speakinStore'])
export default class Input extends Component {
  sendMsg = (e) => {
    const { chatStore } = this.props;
    if (e.nativeEvent.keyCode !== 13 || e.shiftKey) return;
    e.preventDefault();
    const input = e.target;
    let txt = input.value;
    txt = txt.trim();
    if (txt === '') return;
    this.props.speakinStore.send({ txt }, () => {
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

Input.wrappedComponent.propTypes = {
  chatStore: PropTypes.object,
  speakinStore: PropTypes.object
};
