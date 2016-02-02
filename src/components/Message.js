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
import MdCheck from 'react-icons/lib/md/check';
import ToolTip from 'react-portal-tooltip';
import LangSelect from './LangSelect';
import SpeechSelect from './SpeechSelect';

let lastSpoken = '';
export default class ChatInput extends Component {
  static propTypes = {
    message: PropTypes.object,
    isMine: PropTypes.func,
    replay: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func,
    translateLanguages: PropTypes.array,
    lang: PropTypes.string
  };
  static defaultProps = {
    lang: 'en'
  };
  state = {
    isTooltipActive: false,
    isPlayTooltipActive: false
  };
  showTooltip = () => {
    this.setState({ isPlayTooltipActive: false });
    const that = this;
    setTimeout(function () {
      that.setState({ isTooltipActive: !that.state.isTooltipActive });
    }, 10);
  };
  showPlayTooltip = () => {
    this.setState({ isPlayTooltipActive: !this.state.isPlayTooltipActive });
  };
  isLink = (msg) => {
    const media = convertMedia(msg, 150, true);
    if ((media.indexOf('<iframe') > -1) || (media.indexOf('<a href') > -1)) return media;
    return false;
  };
  isVideo = (msg) => {
    const media = convertMedia(msg, 150, true);
    if (media.indexOf('<iframe') > -1) return true;
  };
  prepareForTranslation = (message) => {
    return message.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  };
  play = (message, id, e) => {
    const node = e.currentTarget;
    if (node.children[0].style.display === 'none') {
      if (lastSpoken === id) {
        this.showPlayTooltip();
      } else {
        lastSpoken = id;
        this.toggleIcons(node.children[1], node.children[0]);

        const msg = new SpeechSynthesisUtterance(this.prepareForTranslation(message));
        const that = this;
        msg.onend = function (event) {
          that.toggleIcons(node.children[0], node.children[1]);
        };
        msg.lang = this.props.lang;
        window.speechSynthesis.speak(msg);
      }
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
    const { message, isMine, replay, onTranslate, onDelete, translateLanguages } = this.props;
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
              {this.isLink(message.msg) ?
                <VideoContainer src={this.isLink(message.msg)}/> :
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
              (onTranslate && translateLanguages && !this.isVideo(message.msg)) ?
                <div id={'a' + message.id} onClick={this.showTooltip}>
                  <MdTranslate/>
                  <ToolTip
                    active={this.state.isTooltipActive}
                    position="bottom" arrow="center"
                    parent={'#a' + message.id}
                  >
                    <div className={styles.tooltip}>
                      <div className={styles.titleTooltip}>Translate it to</div>
                      <div style={{ display: 'flex' }}>
                        <LangSelect translateLanguages={translateLanguages}/>
                        <MdCheck className={styles.btn}/>
                        <MdClose className={styles.btn} onClick={this.showTooltip}/>
                      </div>
                    </div>
                  </ToolTip>
                </div> : null
            }
            {
              (!this.isVideo(message.msg) && (window.SpeechSynthesisUtterance)) ?
                <div
                  onClick={this.play.bind(this, message.msg, message.id)}
                  ref={(ref) => this.playSpan = ref}
                >
                  <MdStop style={{ display: 'none' }}/>
                  <MdPlayArrow id={'play' + message.id} />

                  <ToolTip
                    active={this.state.isPlayTooltipActive}
                    position="bottom" arrow="center"
                    parent={'#play' + message.id}
                  >
                    <div className={styles.tooltip}>
                      <div className={styles.titleTooltip}>Read it as</div>
                      <div style={{ display: 'flex' }}>
                        <SpeechSelect voices={speechSynthesis.getVoices()}/>
                        <MdCheck className={styles.btn}/>
                        <MdClose className={styles.btn} onClick={this.showPlayTooltip}/>
                      </div>
                    </div>
                  </ToolTip>
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