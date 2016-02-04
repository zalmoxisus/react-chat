import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import MdCheck from 'react-icons/lib/md/check';
import ToolTip from 'react-portal-tooltip';
import SpeechSelect from './SpeechSelect';

let lastSpoken = '';
let voiceName = 'Google US English';
export default class SpeechSynthesis extends Component {
  static propTypes = {
    message: PropTypes.object,
    lang: PropTypes.string
  };
  state = {
    isPlayTooltipActive: false
  };
  showPlayTooltip = () => {
    this.setState({ isPlayTooltipActive: !this.state.isPlayTooltipActive });
  };
  prepareForTranslation = (message) => {
    return message.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  };
  play = (message, id) => {
    const msg = new SpeechSynthesisUtterance(this.prepareForTranslation(message));
    const that = this;
    this.toggleIcons(true);
    msg.onstart = function (event) {
      if (that.state.isPlayTooltipActive) {
        that.showPlayTooltip();
      }
    };
    msg.onend = function (event) {
      that.toggleIcons(false);
    };
    msg.onerror = function (event) {
      that.toggleIcons(false);
    };
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices.filter(function (voice) { return voice.name === voiceName; })[0];
    window.speechSynthesis.speak(msg);
  };

  speak = (message, id, e) => {
    const node = e.currentTarget;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (lastSpoken !== '') {
        if (this.speech) {
          this.speech.speechSelect.value = voiceName;
        }
        this.showPlayTooltip();
      } else {
        lastSpoken = id;
        this.play(message, id);
      }
    } else {
      this.toggleIcons(false);
      window.speechSynthesis.cancel();
    }
  };
  speak2 = (message, id) => {
    voiceName = this.speech.speechSelect.value;
    this.play(message, id);
  };
  changeVoice = (value) => {
    voiceName = value;
  };
  toggleIcons = (val) => {
    let node1 = this.playSpan.childNodes[0];
    let node2 = this.playSpan.childNodes[1];
    if (val) {
      node1.style.visibility = 'hidden';
      node2.style.visibility = 'visible';
    } else {
      node2.style.visibility = 'hidden';
      node1.style.visibility = 'visible';
    }
  };
  render() {
    const { message, lang } = this.props;
    return (
      <div onClick={this.speak.bind(this, message.msg, message.id)}>
        <span ref={(ref) => this.playSpan = ref}>
          <MdPlayArrow id={'play' + message.id} style={{ position: 'absolute', marginTop: '2px' }}/>
          <MdStop style={{ visibility: 'hidden' }} />
        </span>
        <ToolTip
          active={this.state.isPlayTooltipActive}
          position="bottom" arrow="center"
          parent={'#play' + message.id}
        >
          <div className={styles.tooltip}>
            <div className={styles.titleTooltip}>Read it as</div>
            <div style={{ display: 'flex' }}>
              <SpeechSelect
                voices={window.speechSynthesis.getVoices()}
                lang={lang}
                ref={(ref) => this.speech = ref}
              />
              <MdCheck
                className={styles.btn}
                onClick={this.speak2.bind(this, message.msg, message.id)}
              />
              <MdClose className={styles.btn} onClick={this.showPlayTooltip}/>
            </div>
          </div>
        </ToolTip>
      </div>
    );
  }
}