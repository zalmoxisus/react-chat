import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import Avatar from './Avatar';
import getTimeStamp from '../utils/getTimeStamp.js';
import emojify from '../utils/emojify';
import convertMedia from '../utils/convertMedia';
import VideoContainer from './VideoContainer';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdReply from 'react-icons/lib/md/reply';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdTranslate from 'react-icons/lib/md/translate';

export default class ChatArea extends Component {
  static propTypes = {
    messages: PropTypes.array,
    replay: PropTypes.func,
    isMine: PropTypes.func
  };

  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }

  componentDidUpdate = () => {
    if (this.message.childNodes.length === 3) {
      if ((this.message.childNodes[0].textContent === '') &&
        (this.message.childNodes[2].textContent === '')) {
        this.message.childNodes[1].style.fontSize = '34px';
      }
    }
    this.updateScrollTop();
  };

  updateScrollTop = () => {
    let node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  isMedia = (msg) => {
    const media = convertMedia(msg, 150, true);
    if ((media.indexOf('<iframe') > -1) || (media.indexOf('<a href') > -1)) return media;
    return false;
  };

  render() {
    const { messages, replay, isMine } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          messages.map(message => {
            return (<div key={message.id} className={styles.msgBox}>
                {
                  !isMine(message.sender) &&
                  ((typeof message.showAvatars === 'undefined') ? true : message.showAvatars) &&
                  <Avatar style={styles.avatar}
                    src={message.avatar}
                    name={message.name}
                  />
                }
                <div className={isMine(message.sender) ? styles.arrowRight : styles.arrowLeft}>
                </div>
                <div
                  key={message.msg}
                  className={isMine(message.sender) ? styles.my_msg : styles.u_msg}
                >
                  <div className={styles.firstCellMsg}>
                  <div
                    ref={(ref) => this.message = ref}
                    className={message.msg.length < 8 ?
                    styles.big_content_msg :
                    styles.small_content_msg}
                  >
                    {this.isMedia(message.msg) ?
                      <VideoContainer src={this.isMedia(message.msg)}/> :
                      emojify(message.msg)}
                  </div>
                  <div className={styles.footer_msg}>
                    {
                      !isMine(message.sender) &&
                      <div>
                        <div className={styles.msg_name} onClick={replay}>
                          <span style={{ float: 'left' }}>{message.name}</span>
                          <MdAccessTime className={styles.timeIcon} />
                          <MdReply className={styles.replyIcon} />
                        </div>
                      </div>
                    }
                    <div style={{ float: 'left' }}>{getTimeStamp(message.time)} </div>
                  </div>
                    </div>
                  <div className={styles.secondCellMsg}>
                    <div><MdTranslate/></div>
                    <div><MdPlayArrow/></div>
                    <div><MdClose/></div>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>
    );
  }
}
