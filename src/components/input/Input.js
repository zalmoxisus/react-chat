import React, { Component, PropTypes } from 'react';
import ChatArea from './TextArea';

export default class Input extends Component {
  render() {
    const { chatStore, appStore } = this.props;
    return (<ChatArea
      me={appStore.me}
      changeInpValue={chatStore.changeInpValue}
      sendMsg={chatStore.send}
      inputValue={chatStore.inputValue}
    />
    );
  }
}

Input.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object
};
