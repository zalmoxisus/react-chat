import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import styles from '../../chat.scss';
import getTimeStamp from '../../utils/getTimeStamp.js';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdReply from 'react-icons/lib/md/reply';

@inject('chatStore')
export default class MessageFooter extends Component {

  reply = () => {
    const { chatStore } = this.props;
    chatStore.changeInpValue(chatStore.inputValue + this.props.message.name + ', ');
  };

  render() {
    const { message, isMine } = this.props;
    return (
      <div className={styles.footerMsg}>
        {
          !isMine(message.sender) &&
          <div>
            <div className={styles.msgName} onClick={this.reply}>
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
  chatStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func
};
