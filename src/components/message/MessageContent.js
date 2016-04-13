import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import emojify from '../../utils/emojify';
import VideoContainer from './VideoContainer';
import TranslateBox from './TranslateBox';
import MessageFooter from './MessageFooter';
import convertMedia from '../../utils/convertMedia';

export default class MessageContent extends Component {
  isLink = (msg) => {
    const media = convertMedia(msg, 150, true);
    if (media.indexOf('<iframe') > -1 ||
      media.indexOf('<a href') > -1 ||
      media.indexOf('<img') > -1) {
      return media;
    }
    return false;
  };
  render() {
    const { message, isMine, replay, trLangs, deleteBox } = this.props;
    return (
      <div className={styles.msgContent}>
        <div
          className={message.msg.length < 16 ?
                    styles.bigContent :
                    styles.smallContent}
        >
          {this.isLink(message.msg) ?
            <VideoContainer src={this.isLink(message.msg)} /> :
            emojify(message.msg)}
          <TranslateBox trLangs={trLangs} onDelete={deleteBox} />
        </div>
        <MessageFooter
          message={message}
          isMine={isMine}
          replay={replay}
        />
      </div>
    );
  }
}

MessageContent.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.func,
  replay: PropTypes.func,
  trLangs: PropTypes.array,
  deleteBox: PropTypes.func,
  deleted: PropTypes.bool
};
