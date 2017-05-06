import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../chat.scss';
import emojify from '../../utils/emojify';
import VideoContainer from './VideoContainer';
import TranslateBox from './TranslateBox';
import MessageFooter from './MessageFooter';
import convertMedia from '../../utils/convertMedia';

export default class MessageContent extends Component {
  getMedia = (msg) => {
    const media = convertMedia(msg, 150, true);
    if (media.indexOf('<iframe') > -1 ||
      media.indexOf('<a href') > -1 ||
      media.indexOf('<img') > -1) {
      return media;
    }
    return false;
  };
  render() {
    const { message, isMine, updateInputValue, trLangs, deleteBox } = this.props;
    const { text } = message;
    const media = this.getMedia(text);
    return (
      <div className={styles.msgContent}>
        <div
          className={text.length < 16 ? styles.bigContent : styles.smallContent}
        >
          {media ? <VideoContainer src={media} /> : emojify(text)}
          {
            <TranslateBox trLangs={trLangs} deleteBox={deleteBox} />
          }
        </div>
        <MessageFooter message={message} isMine={isMine} updateInputValue={updateInputValue} />
      </div>
    );
  }
}

MessageContent.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.bool,
  trLangs: PropTypes.array,
  deleteBox: PropTypes.func,
  updateInputValue: PropTypes.func
};
