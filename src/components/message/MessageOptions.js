import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import MdTranslate from 'react-icons/lib/md/translate';
import MdClose from 'react-icons/lib/md/close';
import styles from '../../chat.scss';
import LangSelect from './LangSelect';
import SpeechSynthesis from './Speech/SpeechSynthesis';
import convertMedia from '../../utils/convertMedia';

@observer(['speakinStore'])
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
    this.props.appStore.closeModal();
  };
  isVideo = (msg) => {
    const media = convertMedia(msg, 150, true);
    return (media.indexOf('<iframe') > -1 || media.indexOf('<img') > -1);
  };
  translate = () => {
    const message = this.props.message;
    if (this.lastTranslate === message.id || !this.nativeLng) {
      const modalContent = (
        <div className={styles.modal}>
          <div className={styles.titleModal}>Translate it to</div>
          <div className={styles.flexBox}>
            <LangSelect
              msg={message.msg}
              onChange={this.selectLang}
              lang={this.props.lang}
              translateLanguages={this.props.speakinStore.translateLanguages}
            />
            <MdClose className={styles.btn} onClick={this.props.appStore.closeModal} />
          </div>
        </div>
      );
      this.props.appStore.openModal(modalContent);
    } else {
      this.lastTranslate = message.id;
      this.props.insertTranslation(this.nativeLng, message.msg);
    }
  };
  render() {
    const { chatStore, appStore, message, isMine, deleteMsg, speakinStore } = this.props;
    return (
      <div className={styles.msgOptions}>
        {
          (chatStore.translate &&
          speakinStore.translateLanguages &&
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
              appStore={appStore}
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
  appStore: PropTypes.object,
  chatStore: PropTypes.object,
  speakinStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  insertTranslation: PropTypes.func,
  deleteMsg: PropTypes.func
};
