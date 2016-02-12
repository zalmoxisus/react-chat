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
import MdReplay from 'react-icons/lib/md/replay';
import MdBlock from 'react-icons/lib/md/block';
import ToolTip from 'react-portal-tooltip';
import LangSelect from './LangSelect';
import SpeechSynthesis from './SpeechSynthesis';
import TranslateBox from './TranslateBox';

let currId = '';
let lastTranslate = '';
let nativeLng;
export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object,
    isMine: PropTypes.func,
    replay: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    onBan: PropTypes.func,
    translateLanguages: PropTypes.array,
    lang: PropTypes.string,
    voicesArr: PropTypes.array,
    msgCount: PropTypes.number,
    nativeLng: PropTypes.string
  };
  state = {
    isTooltipActive: false,
    trLangs: [],

    add(trLang) {
      this.trLangs.push(trLang);
    },

    delete(trLang) {
      this.trLangs.forEach(function (item, index, object) {
        if (item.id === trLang) {
          object.splice(index, 1);
        }
      });
    }
  };
  componentDidMount() {
    if (this.props.nativeLng) {
      nativeLng = this.props.nativeLng;
    }
  }
  translate = (id, msg, e) => {
    if (lastTranslate === id || !nativeLng) {
      this.showTooltip(e);
    } else {
      lastTranslate = id;
      this.insertTranslation(nativeLng, msg, e);
    }
  };
  selectLang = (msg, e) => {
    const that = this;
    nativeLng = that.langSelect.languageSelect.value;
    this.insertTranslation(nativeLng, msg, e);
    this.showTooltip(e);
  };
  insertTranslation = (lng, msg, e) => {
    let isLng = false;
    this.state.trLangs.forEach(function (item, index, object) {
      if (item.lang === nativeLng) {
        isLng = true;
      }
    });
    if (!isLng) {
      this.props.onTranslate(
        msg,
        lng,
        txt => {
          const trLang = {
            id: 'tr' + (Date.now() / 1000 | 0),
            lang: lng,
            txt
          };
          this.state.add(trLang);
          this.setState(this.state);
        }
      );
    } else {
      this.showTooltip(e);
    }
  };
  deleteBox = (trLang) => {
    this.state.delete(trLang);
    this.setState(this.state);
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
  deleteMsg = (message) => {
    const msg = this.msg;
    this.props.onDelete(message, function success() {
      msg.children[0].style.display = 'none';
      msg.children[1].style.display = 'none';
      msg.children[2].style.display = 'block';
    });
  };
  restoreMsg = (message) => {
    const msg = this.msg;
    this.props.onRestore(message, function success() {
      msg.children[0].style.display = 'block';
      msg.children[1].style.display = 'block';
      msg.children[2].style.display = 'none';
    });
  };
  ban = (name, id, e) => {
    let banned = confirm(name + ' will be banned for this discussion');
    if (banned === true) {
      this.props.onBan(id, function success() {
        const node = e.currentTarget;
        node.innerHTML = 'Banned';
        node.style.color = '#bbb';
        node.style.cursor = 'default';
        node.onclick = function (event) {
          event.stopPropagation();
        };
      });
    }
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
          ref={(ref) => this.msg = ref}
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
              <TranslateBox trLangs={this.state.trLangs} onDelete={this.deleteBox}/>
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
                <div
                  id={'a' + message.id}
                  onClick={this.translate.bind(this, message.id, message.msg)}
                >
                  <MdTranslate/>
                  <ToolTip
                    active={this.state.isTooltipActive}
                    position={msgCount > 1 ? 'top' : 'bottom'} arrow="center"
                    parent={'#a' + message.id}
                  >
                    <div className={styles.tooltip}>
                      <div className={styles.titleTooltip}>Translate it to</div>
                      <div style={{ display: 'flex' }}>
                        <LangSelect
                          translateLanguages={translateLanguages}
                          ref={(ref) => this.langSelect = ref}
                        />
                        <MdCheck
                          className={styles.btn}
                          onClick={this.selectLang.bind(this, message.msg)}
                        />
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
          <div className={styles.restoreMsg}>
            <div>
              <MdClose/>
              <span>Message deleted</span>
            </div>
            <span onClick={this.restoreMsg}>
              <MdReplay/>
              <span>Restore the message</span>
            </span>
            {isMine(message.sender) ?
              null :
              <span>
                <span style={{ color: '#bbb' }}> | </span>
                <span onClick={this.ban.bind(this, message.name, message.id)}>
                  <MdBlock/>
                  <span>Ban for an hour</span>
                </span>
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}