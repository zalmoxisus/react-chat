import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onMessage: PropTypes.func
  };
  updateName = (e) => {
    let node = document.getElementsByTagName('textarea')[0];
    node.value = e + node.value;
    node.focus();
  };

  render() {
    return (<div>
        <div className={styles.base}>
          <ChatArea messages={this.props.messages} updateName={this.updateName} />
          <ChatInput onMessage={this.props.onMessage}/>
        </div>
      </div>
    );
  }
}
