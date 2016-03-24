import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Avatar from './Avatar';
import getTimeStamp from '../utils/getTimeStamp.js';
import emojify from '../utils/emojify';
import convertMedia from '../utils/convertMedia';
import VideoContainer from './VideoContainer';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdReply from 'react-icons/lib/md/reply';
import MdClose from 'react-icons/lib/md/close';
import MdTranslate from 'react-icons/lib/md/translate';
import MdReplay from 'react-icons/lib/md/replay';
import MdBlock from 'react-icons/lib/md/block';
import ToolTip from '../utils/Tooltip';
import LangSelect from './LangSelect';
import SpeechSynthesis from './SpeechSynthesis';
import TranslateBox from './TranslateBox';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTooltipActive: false,
      trLangs: [],

      add(trLang) {
        this.trLangs.push(trLang);
      },

      delete(trLang) {
        this.trLangs.forEach((item, index, object) => {
          if (item.id === trLang) {
            object.splice(index, 1);
          }
        });
      }
    };
  }
  componentDidMount() {
    if (this.props.nativeLng) {
      this.nativeLng = this.props.nativeLng;
    }
  }
  mapRefMsg = (node) => {
    this.msg = node;
  };
  mapRefSelect = (node) => {
    this.langSelect = node;
  };
  translate = (id, msg, e) => {
    if (this.lastTranslate === id || !this.nativeLng) {
      this.showTooltip(e);
    } else {
      this.lastTranslate = id;
      this.insertTranslation(this.nativeLng, msg, e);
    }
  };
  selectLang = (val, msg, e) => {
    this.nativeLng = val;
    this.insertTranslation(this.nativeLng, msg, e);
    this.showTooltip(e);
  };
  insertTranslation = (lng, msg, e) => {
    let isLng = false;
    this.state.trLangs.forEach((item) => {
      if (item.lang === this.nativeLng) {
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
  showTooltip = () => {
    this.setState({ isTooltipActive: !this.state.isTooltipActive });
  };
  isLink = (msg) => {
    const media = convertMedia(msg, 150, true);
    if (media.indexOf('<iframe') > -1 ||
      media.indexOf('<a href') > -1 ||
      media.indexOf('<img') > -1) {
      return media;
    }
    return false;
  };
  isVideo = (msg) => {
    const media = convertMedia(msg, 150, true);
    return (media.indexOf('<iframe') > -1);
  };
  deleteMsg = (message) => {
    const msg = this.msg;
    this.props.onDelete(message, () => {
      msg.children[0].style.display = 'none';
      msg.children[1].style.display = 'none';
      msg.children[2].style.display = 'block';
    });
  };
  restoreMsg = (message) => {
    const msg = this.msg;
    this.props.onRestore(message, () => {
      msg.children[0].style.display = 'block';
      msg.children[1].style.display = 'block';
      msg.children[2].style.display = 'none';
    });
  };
  ban = (name, id, e) => {
    let banned = confirm(name + ' will be banned for this discussion');
    if (banned === true) {
      this.props.onBan(id, () => {
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
      message, isMine, replay, onTranslate, withPhoto,
      onDelete, translateLanguages, lang, voicesArr } = this.props;
    return (
      <div className={styles.msgBox}>
        {
          withPhoto &&
          !isMine(message.sender) &&
          ((typeof message.showAvatars === 'undefined') ? true : message.showAvatars) &&
          <Avatar className={styles.avatar}
            id={message.id}
            src={message.avatar}
            name={message.name}
          />
        }
        <div className={isMine(message.sender) ? styles.arrowRight : styles.arrowLeft}>
        </div>
        <div
          ref={this.mapRefMsg}
          key={message.msg}
          className={isMine(message.sender) ? styles.myMsg : styles.uMsg}
        >
          <div className={styles.firstCell}>
            <div
              className={message.msg.length < 16 ?
                    styles.bigContent :
                    styles.smallContent}
            >
              {this.isLink(message.msg) ?
                <VideoContainer src={this.isLink(message.msg)} /> :
                emojify(message.msg)}
              <TranslateBox trLangs={this.state.trLangs} onDelete={this.deleteBox} />
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
                <div id={'a' + message.id}
                  onClick={this.translate.bind(this, message.id, message.msg)}
                  className={styles.btn}
                >
                  <div>
                    <MdTranslate />
                  </div>
                  <ToolTip className={styles.translateTooltip}
                    horizontalPosition={isMine(message.sender) ? 'left' : 'right'}
                    horizontalAlign={isMine(message.sender) ? 'left' : 'right'}
                    verticalPosition="bottom"
                    arrowSize={7}
                    borderColor="#7F7E7E"
                    show={this.state.isTooltipActive}
                  >
                    <div></div>
                    <div className={styles.tooltip}>
                      <div className={styles.titleTooltip}>Translate it to</div>
                      <div style={{ display: 'flex' }}>
                        <LangSelect
                          translateLanguages={translateLanguages}
                          lang={lang}
                          msg={message.msg}
                          onChange={this.selectLang}
                          ref={this.mapRefSelect}
                        />
                        <MdClose className={styles.btn} onClick={this.showTooltip} />
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
                  isMine={isMine(message.sender)}
                /> : null
            }
            {
              (onDelete) ?
                <div onClick={this.deleteMsg.bind(this, message.id)} className={styles.btn}>
                  <MdClose />
                </div> : null
            }
          </div>
          <div className={styles.restoreMsg}>
            <div>
              <MdClose />
              <span>Message deleted</span>
            </div>
            <span onClick={this.restoreMsg}>
              <MdReplay />
              <span>Restore the message</span>
            </span>
            {isMine(message.sender) ?
              null :
              <span>
                <span style={{ color: '#bbb' }}> | </span>
                <span onClick={this.ban.bind(this, message.name, message.id)}>
                  <MdBlock />
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

Message.propTypes = {
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
  nativeLng: PropTypes.string,
  withPhoto: PropTypes.bool
};