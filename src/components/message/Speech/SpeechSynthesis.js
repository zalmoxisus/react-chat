import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import styles from '../../../chat.scss';

export default class SpeechSynthesis extends Component {
  componentDidMount() {
    this.voiceName = this.props.voices[0].name;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.voices !== this.props.voices && this.props.voices.length > 0) {
      this.voiceName = this.props.voices[0].name;
    }
  }

  mapRef = (node) => {
    this.playSpan = node;
  };
  sanitize(msg) {
    return msg.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  }
  play = () => {
    const { voices, message } = this.props;
    let msg = message.text;
    msg = new SpeechSynthesisUtterance(this.sanitize(msg));
    this.toggleIcons();
    msg.onend = () => {
      this.toggleIcons();
    };
    msg.onerror = () => {
      this.toggleIcons();
    };
    msg.voice = voices.filter(voice => voice.name === this.voiceName)[0];
    window.speechSynthesis.speak(msg);
  };

  speak = () => {
    const { voices, message } = this.props;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (this.lastSpoken === message._id && voices.length > 1) {
        const modalContent = {
          type: 'speech',
          title: 'Read it as',
          list: voices,
          func: this.speakFromModal
        };
        this.props.handleModal(modalContent, true);
      } else {
        this.lastSpoken = message._id;
        this.play();
      }
    } else {
      if (!window.speechSynthesis.speaking) this.toggleIcons();
      else window.speechSynthesis.cancel();
    }
  };
  speakFromModal = (value) => {
    this.voiceName = value;
    this.play();
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
  voices: PropTypes.array,
  message: PropTypes.object,
  handleModal: PropTypes.func
};
