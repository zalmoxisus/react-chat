import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import ToolTip from '../../utils/Tooltip';
import LangSelect from './LangSelect';
import SpeechSynthesis from './Speech/SpeechSynthesis';
import convertMedia from '../../utils/convertMedia';
import MdTranslate from 'react-icons/lib/md/translate';
import MdClose from 'react-icons/lib/md/close';

export default class MessageOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTooltipActive: false
    };
    if (this.props.nativeLng) {
      this.nativeLng = this.props.nativeLng;
    }
  }
  showTooltip = () => {
    this.setState({ isTooltipActive: !this.state.isTooltipActive });
  };
  selectLang = (val, msg) => {
    this.nativeLng = val;
    this.props.insertTranslation(this.nativeLng, msg);
    this.showTooltip();
  };
  isVideo = (msg) => {
    const media = convertMedia(msg, 150, true);
    return (media.indexOf('<iframe') > -1 || media.indexOf('<img') > -1);
  };
  translate = () => {
    const message = this.props.message;
    if (this.lastTranslate === message.id || !this.nativeLng) {
      this.showTooltip();
    } else {
      this.lastTranslate = message.id;
      this.props.insertTranslation(this.nativeLng, message.msg);
    }
  };
  render() {
    const { message, onTranslate, translateLanguages,
      lang, voicesArr, onDelete, isMine, deleteMsg } = this.props;
    return (
      <div className={styles.msgOptions}>
        {
          (onTranslate && translateLanguages && !this.isVideo(message.msg)) ?
            <div>
              <div id={'a' + message.id}
                onClick={this.translate}
                className={styles.btn}
              >
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
            <div onClick={deleteMsg} className={styles.btn}>
              <MdClose />
            </div> : null
        }
      </div>
    );
  }
}
MessageOptions.propTypes = {
  message: PropTypes.object,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array,
  lang: PropTypes.string,
  voicesArr: PropTypes.array,
  onDelete: PropTypes.func,
  isMine: PropTypes.func,
  nativeLng: PropTypes.string,
  insertTranslation: PropTypes.func,
  deleteMsg: PropTypes.func
};