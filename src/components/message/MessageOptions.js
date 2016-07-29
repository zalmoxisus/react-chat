import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import LangSelect from './LangSelect';
import SpeechSynthesis from './Speech/SpeechSynthesis';
import convertMedia from '../../utils/convertMedia';
import MdTranslate from 'react-icons/lib/md/translate';
import MdClose from 'react-icons/lib/md/close';
import { observer, inject } from 'mobx-react';

@inject('chatStore', 'chatViewStore') @observer
export default class MessageOptions extends Component {
  constructor(props) {
    super(props);
    if (this.props.chatViewStore.nativeLng) {
      this.nativeLng = this.props.chatViewStore.nativeLng;
    }
  }
  selectLang = (val, msg) => {
    this.nativeLng = val;
    this.props.insertTranslation(this.nativeLng, msg);
    this.props.closeModal();
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
          <div style={{ display: 'flex' }}>
            <LangSelect
              msg={message.msg}
              onChange={this.selectLang}
              chatViewStore={this.props.chatViewStore}
            />
            <MdClose className={styles.btn} onClick={this.props.closeModal} />
          </div>
        </div>
      );
      this.props.openModal(modalContent);
    } else {
      this.lastTranslate = message.id;
      this.props.insertTranslation(this.nativeLng, message.msg);
    }
  };
  render() {
    const { chatViewStore, message,
      chatStore, isMine, deleteMsg, openModal, closeModal } = this.props;
    return (
      <div className={styles.msgOptions}>
        {
          (chatViewStore.translate &&
          chatViewStore.translateLanguages &&
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
          this.props.chatViewStore.voicesArr.length > 0) ?
            <SpeechSynthesis
              message={message}
              isMine={isMine(message.sender)}
              openModal={openModal}
              closeModal={closeModal}
            /> : null
        }
        {
          (chatStore.remove) ?
            <div onClick={deleteMsg} className={styles.btn}>
              <MdClose />
            </div> : null
        }
      </div>
    );
  }
}
MessageOptions.propTypes = {
  chatStore: PropTypes.object,
  chatViewStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  insertTranslation: PropTypes.func,
  deleteMsg: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
