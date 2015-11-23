import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onMessage: PropTypes.func
  };

  render() {
    return (<div>
        <div className={styles.base}>
          <ChatArea messages={this.props.messages}/>
          <ChatInput onMessage={this.props.onMessage}/>
        </div>
      </div>
    );
  }
}
