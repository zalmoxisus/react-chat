import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../chat.scss';
import getTimeStamp from '../../utils/getTimeStamp.js';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdReply from 'react-icons/lib/md/reply';

export default class MessageFooter extends Component {
  reply = () => {
    this.props.updateInputValue(inputValue => `${this.props.message.user.name}, ${inputValue}`);
  };

  render() {
    const { message, isMine } = this.props;
    return (
      <div className={styles.footerMsg}>
        {!isMine &&
          <div>
            <div className={styles.msgName} onClick={this.reply}>
              <span className={styles.leftSpan}>{message.user.name}</span>
              <MdAccessTime className={styles.timeIcon} />
              <MdReply className={styles.replyIcon} />
            </div>
          </div>
        }
        <div className={styles.leftSpan}>{getTimeStamp(message.createdAt)} </div>
      </div>
    );
  }
}

MessageFooter.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.bool,
  updateInputValue: PropTypes.func
};
