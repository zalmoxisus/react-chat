import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Message from './message/Message';

export default class ChatArea extends Component {
  componentDidMount() {
    this.scrollDown = true;
    setTimeout(this.updateScrollTop, 0);
  }

  componentWillReceiveProps() {
    const node = this.node;
    if (!node) {
      this.scrollDown = true;
    } else {
      const { scrollTop, offsetHeight, scrollHeight } = node;
      this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 50;
    }
  }

  componentDidUpdate() {
    this.updateScrollTop();
  }

  getRef = node => {
    this.node = node;
    this.updateScrollTop();
  };

  updateScrollTop = () => {
    if (!this.scrollDown || !this.node) return;
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
