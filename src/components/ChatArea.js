import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Message from './message/Message';

export default class ChatArea extends Component {
  componentDidMount() {
    setTimeout(this.updateScrollTop, 0);
  }

  componentDidUpdate() {
    this.updateScrollTop();
  }

  getRef = node => {
    this.node = node;
    this.updateScrollTop();
  };

  updateScrollTop = () => {
    if (!this.node) return;
    this.node.scrollTop = this.node.scrollHeight;
  };

  render() {
    const { messages, ...rest } = this.props;
    return (
      <div ref={this.getRef} className={styles.container}>
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
  avatarPreviewPosition: PropTypes.string,
  updateInputValue: PropTypes.func
};
