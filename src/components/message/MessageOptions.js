import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import MdTranslate from 'react-icons/lib/md/translate';
import MdClose from 'react-icons/lib/md/close';
import styles from '../../chat.scss';
import SpeechSynthesis from './Speech/SpeechSynthesis';
import convertMedia from '../../utils/convertMedia';

@observer(['store'])
export default class MessageOptions extends Component {
  constructor(props) {
    super(props);
    if (this.props.chatStore.nativeLng) {
      this.nativeLng = this.props.chatStore.nativeLng;
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
    if (this.lastTranslate === message.id || !this.nativeLng) {
      const modalContent = {
        type: 'translate',
        title: 'Translate it to',
        list: this.props.store.translateLanguages,
        func: this.selectLang,
        msg: message.msg
      };
      this.props.store.openModal(modalContent);
    } else {
      this.lastTranslate = message.id;
      this.props.insertTranslation(this.nativeLng, message.msg);
    }
  };
  render() {
    const { chatStore, message, isMine, deleteMsg, store } = this.props;
    return (
      <div className={styles.msgOptions}>
        {
          (chatStore.translate &&
          store.translateLanguages &&
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
        {
          (!this.isVideo(message.msg) &&
          window.SpeechSynthesisUtterance &&
          this.props.chatStore.voices.length > 0) ?
            <SpeechSynthesis
              voices={chatStore.voices}
              store={store}
              message={message}
              isMine={isMine(message.sender)}
            /> : null
        }
        {
          (chatStore.ban) ?
            <div onClick={deleteMsg} className={styles.btn}>
              <MdClose />
            </div> : null
        }
      </div>
    );
  }
}
MessageOptions.wrappedComponent.propTypes = {
  chatStore: PropTypes.object,
  store: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  insertTranslation: PropTypes.func,
  deleteMsg: PropTypes.func
};
