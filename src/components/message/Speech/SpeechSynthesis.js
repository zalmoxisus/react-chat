import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import styles from '../../../chat.scss';
import SpeechSelect from './SpeechSelect';

@inject('chatStore', 'appStore') @observer
export default class SpeechSynthesis extends Component {
  componentDidMount() {
    this.voiceName = this.props.chatStore.voices[0].name;
  }

  mapRef = (node) => {
    this.playSpan = node;
  };
  sanitize(msg) {
    return msg.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  }
  play = () => {
    const { chatStore, message } = this.props;
    let msg = message.msg;
    msg = new SpeechSynthesisUtterance(this.sanitize(msg));
    this.toggleIcons();
    msg.onend = () => {
      this.toggleIcons();
    };
    msg.onerror = () => {
      this.toggleIcons();
    };
    const voices = chatStore.voices;
    msg.voice = voices.filter(voice => voice.name === this.voiceName)[0];
    window.speechSynthesis.speak(msg);
  };

  speak = () => {
    const { chatStore, appStore, message } = this.props;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (this.lastSpoken === message.id && chatStore.voices.length > 1) {
        const modalContent = (
          <div className={styles.modal}>
            <div className={styles.titleModal}>Read it as</div>
            <div style={{ display: 'flex' }}>
              <SpeechSelect
                value={this.voiceName}
                onChange={this.speakFromModal}
                chatStore={chatStore}
              />
              <MdClose className={styles.btn} onClick={appStore.closeModal} />
            </div>
          </div>
        );
        appStore.openModal(modalContent);
      } else {
        this.lastSpoken = message.id;
        this.play();
      }
    } else {
      window.speechSynthesis.cancel();
    }
  };
  speakFromModal = (value = this.props.chatStore.voices[0].name) => {
    this.voiceName = value;
    this.play();
    this.props.appStore.closeModal();
  };
  toggleIcons = () => {
    const node1 = this.playSpan.childNodes[0].style;
    const node2 = this.playSpan.childNodes[1].style;
    node1.visibility = (node1.visibility === 'hidden') ? 'visible' : 'hidden';
    node2.visibility = (node2.visibility === 'hidden') ? 'visible' : 'hidden';
  };
  render() {
    return (
      <div>
        <div
          className={styles.playContainer}
          onClick={this.speak}
          ref={this.mapRef}
        >
          <MdPlayArrow className={styles.playBtn} />
          <MdStop style={{ visibility: 'hidden' }} />
        </div>
      </div>
    );
  }
}

SpeechSynthesis.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.bool
};
