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
              <span style={{ float: 'left' }}>{message.name}</span>
              <MdAccessTime className={styles.timeIcon} />
              <MdReply className={styles.replyIcon} />
            </div>
          </div>
        }
        <div style={{ float: 'left' }}>{getTimeStamp(message.time)} </div>
      </div>
    );
  }
}

MessageFooter.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.func,
  replay: PropTypes.func
};
