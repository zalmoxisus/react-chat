import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import Avatar from '../Avatar';
import MessageContent from './MessageContent';

export default class Message extends Component {
  shouldComponentUpdate(nextProps) {
    return false; // nextProps.removed !== this.props.removed
  }

  render() {
    const { message, user, showAvatars, avatarPreviewPosition, updateInputValue } = this.props;
    const isMine = message.user._id === user._id;
    return (
      <div className={styles.msgBox}>
        {showAvatars && message.user._id !== user._id && !isMine &&
          <Avatar className={styles.avatar}
            id={message._id}
            src={message.user.avatar}
            name={message.user.name}
            toolTipPosition={avatarPreviewPosition}
          >
          </Avatar>
        }
        <div className={isMine ? styles.arrowRight : styles.arrowLeft} />
        <div
          key={message._id}
          className={isMine ? styles.myMsg : styles.uMsg}
        >
          {!message.removed &&
            <MessageContent
              message={message}
              isMine={isMine}
              updateInputValue={updateInputValue}
            />
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string,
  updateInputValue: PropTypes.func
};
