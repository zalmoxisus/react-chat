import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import styles from './chat.scss';

export default class Chat extends Component {
  render() {
    return (
      <div className={styles.base}>
        <ChatArea {...this.props} />
      </div>
    );
  }
}

Chat.defaultProps = {
  messages: [],
  user: {},
  showAvatars: true,
  avatarPreviewPosition: 'right'
};

Chat.propTypes = {
  messages: PropTypes.array,
  user: PropTypes.shape({
    _id: PropTypes.any
  }),
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string,
  updateInputValue: PropTypes.func
};
