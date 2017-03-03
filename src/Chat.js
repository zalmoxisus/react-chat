import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import styles from './chat.scss';

export default class Chat extends Component {
  render() {
    return (
      <div className={styles.base}>
        <ChatArea messages={this.props.messages} />
      </div>
    );
  }
}

Chat.defaultProps = {
  messages: []
};

Chat.propTypes = {
  messages: PropTypes.array
};
