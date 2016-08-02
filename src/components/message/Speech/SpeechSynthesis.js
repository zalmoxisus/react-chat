import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import styles from '../../../chat.scss';
import SpeechSelect from './SpeechSelect';

@inject('chatStore') @observer
export default class SpeechSynthesis extends Component {
  componentDidMount() {
    this.voiceName = this.props.chatStore.voicesArr[0].name;
  }
  getSanitizedMsg() {
    return this.props.message.msg.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  }
  mapRef = (node) => {
    this.playSpan = node;
  };
  play = () => {
    const msg = new SpeechSynthesisUtterance(this.getSanitizedMsg());
    this.toggleIcons(this.playSpan.childNodes[0], this.playSpan.childNodes[1]);
    const playBtn = this.playSpan.childNodes[0];
    const stopBtn = this.playSpan.childNodes[1];
    msg.onend = () => {
      this.toggleIcons(stopBtn, playBtn);
    };
    msg.onerror = () => {
      this.toggleIcons(stopBtn, playBtn);
    };
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices.filter(voice => voice.name === this.voiceName)[0];
    window.speechSynthesis.speak(msg);
  };

  speak = () => {
    const { id } = this.props.message;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (this.lastSpoken === id && this.props.chatStore.voicesArr.length > 1) {
        const modalContent = (
          <div className={styles.modal}>
            <div className={styles.titleModal}>Read it as</div>
            <div style={{ display: 'flex' }}>
              <SpeechSelect
                value={this.voiceName}
                onChange={this.speakFromModal}
                chatStore={this.props.chatStore}
              />
              <MdClose className={styles.btn} onClick={this.props.closeModal} />
            </div>
          </div>
        );
        this.props.openModal(modalContent);
      } else {
        this.lastSpoken = id;
        this.play();
      }
    } else {
      this.toggleIcons(this.playSpan.childNodes[1], this.playSpan.childNodes[0]);
      window.speechSynthesis.cancel();
    }
  };
  speakFromModal = (value = this.props.chatStore.voicesArr[0].name) => {
    this.voiceName = value;
    this.play();
    this.props.closeModal();
  };
  toggleIcons = (n1, n2) => {
    const node1 = n1;
    const node2 = n2;
    node1.style.visibility = 'hidden';
    node2.style.visibility = 'visible';
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
  chatStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};
