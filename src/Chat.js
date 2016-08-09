import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

@inject('chatStore') @observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        (this.props.chatStore.voicesArr.length === 0) && this.props.chatStore.addVoice();
      };
    }
  }
  replay = (e) => {
    const name = e.currentTarget.textContent;
    const node = this.input.usermsg;
    node.value = name + ', ' + node.value;
    node.focus();
  };

  render() {
    return (
      <div className={styles.base}>
        <ChatArea
          replay={this.replay}
        />
        <ChatInput
          ref={node => {this.input = node;}}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  chatStore: PropTypes.object
};
