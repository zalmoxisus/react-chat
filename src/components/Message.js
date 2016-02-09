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
import MdTranslate from 'react-icons/lib/md/translate';
import MdCheck from 'react-icons/lib/md/check';
import ToolTip from 'react-portal-tooltip';
import LangSelect from './LangSelect';
import SpeechSynthesis from './SpeechSynthesis';
import TranslateBox from './TranslateBox';

let currId = '';
export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object,
    isMine: PropTypes.func,
    replay: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func,
    translateLanguages: PropTypes.array,
    lang: PropTypes.string,
    voicesArr: PropTypes.array,
    msgCount: PropTypes.number
  };
  state = {
    isTooltipActive: false
  };
  showTooltip = (e) => {
    let currState;
    if (!e.currentTarget.id) currState = false;
    else {
      currState = !(currId === e.currentTarget.id && this.state.isTooltipActive === true);
      currId = e.currentTarget.id;
    }
    if (this.SpeechSynthesis.state.isPlayTooltipActive) {
      this.SpeechSynthesis.state.isPlayTooltipActive = false;
      currId = e.currentTarget.id;
      currState = false;
      this.forceUpdate();
    }
    this.setState({ isTooltipActive: currState });
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
  deleteMsg = (message, e) => {
    this.props.onDelete(message, function success() {
      //on delete success
    });
  };
  render() {
    const {
      message, isMine, replay, onTranslate,
      onDelete, translateLanguages, lang, voicesArr, msgCount } = this.props;
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
              <TranslateBox lang={lang} ref={(ref) => this.translateBox = ref}/>
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
                    position={msgCount > 1 ? 'top' : 'bottom'} arrow="center"
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
              (!this.isVideo(message.msg) &&
              window.SpeechSynthesisUtterance &&
              voicesArr.length > 0) ?
                <SpeechSynthesis
                  message={message}
                  lang={lang}
                  voicesArr={voicesArr}
                  msgCount={msgCount}
                  ref={(ref) => this.SpeechSynthesis = ref}
                /> : null
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