import React, { Component, PropTypes } from 'react';
import MdTranslate from 'react-icons/lib/md/translate';
import MdClose from 'react-icons/lib/md/close';
import styles from '../../chat.scss';
import SpeechSynthesis from './Speech/SpeechSynthesis';
import convertMedia from '../../utils/convertMedia';

export default class MessageOptions extends Component {
  constructor(props) {
    super(props);
    this.nativeLng = this.props.nativeLng;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.trLangs.length === 0) {
      this.lastTranslate = undefined;
    }
  }
  selectLang = (val, msg) => {
    this.nativeLng = val;
    this.props.insertTranslation(this.nativeLng, msg);
  };
  isVideo = (msg) => {
    const media = convertMedia(msg, 150, true);
    return (media.indexOf('<iframe') > -1 || media.indexOf('<img') > -1);
  };
  translate = () => {
    const message = this.props.message;
    if (this.lastTranslate === message._id || !this.nativeLng) {
      const modalContent = {
        type: 'translate',
        title: 'Translate it to',
        list: this.props.translateLanguages,
        selectedItem: this.props.trLangs[this.props.trLangs.length-1].lang,
        func: this.selectLang,
        msg: message.text
      };
      this.props.openModal(modalContent);
    } else {
      this.lastTranslate = message._id;
      this.props.insertTranslation(this.nativeLng, message.text);
    }
  };
  render() {
    const { message, removeMsg, onTranslate, translateLanguages,
      voices, openModal, ban, manageMessage } = this.props;
    return (
      <div className={styles.msgOptions}>
        {
          (onTranslate && translateLanguages &&
          !this.isVideo(message.msg)) ?
            <div>
              <div id={'a' + message.id}
                onClick={this.translate}
                className={styles.btn}
              >
                <MdTranslate />
              </div>
            </div> : null
        }
        { !this.isVideo(message.text) && window.SpeechSynthesisUtterance &&
          voices && voices.length > 0 &&
            <SpeechSynthesis
              {...{ voices, message, openModal }}
            />
        }
        { ban && manageMessage &&
            <div onClick={removeMsg} className={styles.btn}>
              <MdClose />
            </div>
        }
      </div>
    );
  }
}
MessageOptions.propTypes = {
  message: PropTypes.object,
  insertTranslation: PropTypes.func,
  removeMsg: PropTypes.func,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array,
  voices: PropTypes.array,
  nativeLng: PropTypes.string,
  trLangs: PropTypes.array,
  openModal: PropTypes.func,
  ban: PropTypes.func,
  manageMessage: PropTypes.func
};
