import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import getTimeStamp from '../../utils/getTimeStamp.js';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdReply from 'react-icons/lib/md/reply';

export default class MessageFooter extends Component {

  render() {
    const { message, isMine, replay } = this.props;
    return (
      <div className={styles.footerMsg}>
        {
          !isMine(message.sender) &&
          <div>
            <div className={styles.msgName} onClick={replay}>
              <span className={styles.leftSpan}>{message.name}</span>
              <MdAccessTime className={styles.timeIcon} />
              <MdReply className={styles.replyIcon} />
            </div>
          </div>
        }
        <div className={styles.leftSpan}>{getTimeStamp(message.time)} </div>
      </div>
    );
  }
}

MessageFooter.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.func,
  replay: PropTypes.func
};
