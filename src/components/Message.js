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
import MdStop from 'react-icons/lib/md/stop';
import MdTranslate from 'react-icons/lib/md/translate';
import ToolTip from 'react-portal-tooltip';

export default class ChatInput extends Component {
  static propTypes = {
    message: PropTypes.object,
    isMine: PropTypes.func,
    replay: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func
  };
  state = {
    isTooltipActive: false
  };
  showTooltip = () => {
    this.setState({ isTooltipActive: !this.state.isTooltipActive });
  };
  isMedia = (msg) => {
    const media = convertMedia(msg, 150, true);
    if ((media.indexOf('<iframe') > -1) || (media.indexOf('<a href') > -1)) return media;
    return false;
  };
  showPlay = (msg) => {
    const media = convertMedia(msg, 150, true);
    if (media.indexOf('<iframe') > -1) return true;
  };
  prepareForTranslation = (message) => {
    return message.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  };
  play = (message, e) => {
    const node = e.currentTarget;
    if (node.children[0].style.display === 'none') {
      this.toggleIcons(node.children[1], node.children[0]);

      const msg = new SpeechSynthesisUtterance(this.prepareForTranslation(message));
      const that = this;
      msg.onend = function (event) {
        that.toggleIcons(node.children[0], node.children[1]);
      };
      window.speechSynthesis.speak(msg);
    } else {
      window.speechSynthesis.cancel();
      this.toggleIcons(node.children[0], node.children[1]);
    }
  };
  deleteMsg = (message, e) => {
    this.props.onDelete(message, function success() {
      //on delete success
    });
  };
  toggleIcons = (icon1, icon2) => {
    const node1 = icon1;
    const node2 = icon2;
    node1.style.display = 'none';
    node2.style.display = 'block';
  };
  render() {
    const { message, isMine, replay, onTranslate, onDelete } = this.props;
    return (
      <div className={styles.msgBox}>
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
          className={isMine(message.sender) ? styles.myMsg : styles.uMsg}
        >
          <div className={styles.firstCell}>
            <div
              ref={(ref) => this.message = ref}
              className={message.msg.length < 8 ?
                    styles.bigContent :
                    styles.smallContent}
            >
              {this.isMedia(message.msg) ?
                <VideoContainer src={this.isMedia(message.msg)}/> :
                emojify(message.msg)}
            </div>
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
          </div>
          <div className={styles.secondCell}>
            {
              (onTranslate) ?
                <div>
                  <MdTranslate id={'a' + message.id} onClick={this.showTooltip}/>
                  <ToolTip
                    active={this.state.isTooltipActive}
                    position="top" arrow="center"
                    parent={'#a' + message.id}
                  >
                    hi
                  </ToolTip>
                </div> : null
            }
            {!this.showPlay(message.msg) ?
              <div
                onClick={this.play.bind(this, message.msg)}
                ref={(ref) => this.playSpan = ref}
              >
                <MdStop style={{ display: 'none' }}/>
                <MdPlayArrow/>
              </div> : null
            }
            {
              (onDelete) ?
                <div onClick={this.deleteMsg.bind(this, message.id)}>
                  <MdClose/>
                </div> : null
            }
          </div>
        </div>
      </div>
    );
  }
}