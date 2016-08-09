import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

export default class Chat extends Component {
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

