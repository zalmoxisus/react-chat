import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Message from './message/Message';

export default class ChatArea extends Component {
  render() {
    const { messages, ...rest } = this.props;
    return (
      <div id="container" className={styles.container}>
        {messages.map(message =>
          <Message
            key={message._id}
            message={message}
            {...rest}
          />
        )}
      </div>
    );
  }
}

ChatArea.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string
};
