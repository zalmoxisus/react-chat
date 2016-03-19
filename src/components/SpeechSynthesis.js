import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import MdCheck from 'react-icons/lib/md/check';
import ToolTip from '../utils/Tooltip';
import SpeechSelect from './SpeechSelect';

let lastSpoken = '';
let voiceName = '';
export default class SpeechSynthesis extends Component {
  state = {
    isPlayTooltipActive: false
  };
  componentDidMount() {
    voiceName = this.props.voicesArr[0].name;
  }
  mapRef = (node) => {
    this.playSpan = node;
  };
  showPlayTooltip = () => {
    this.setState({ isPlayTooltipActive: !this.state.isPlayTooltipActive });
  };
  prepareForTranslation = (message) => {
    return message.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  };
  play = (message, id) => {
    const msg = new SpeechSynthesisUtterance(this.prepareForTranslation(message));
    this.toggleIcons(this.playSpan.childNodes[0], this.playSpan.childNodes[1]);
    msg.onstart = (event) => {
      if (this.state.isPlayTooltipActive) {
        this.showPlayTooltip();
      }
    };
    const playBtn = this.playSpan.childNodes[0];
    const stopBtn = this.playSpan.childNodes[1];
    msg.onend = (event) => {
      this.toggleIcons(stopBtn, playBtn);
    };
    msg.onerror = (event) => {
      this.toggleIcons(stopBtn, playBtn);
    };
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices.filter(function (voice) { return voice.name === voiceName; })[0];
    window.speechSynthesis.speak(msg);
  };

  speak = (message, id, e) => {
    const node = e.currentTarget;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (lastSpoken === id && this.props.voicesArr.length > 1) {
        if (this.speech) {
          this.speech.speechSelect.value = voiceName;
        }
        this.showPlayTooltip();
      } else {
        lastSpoken = id;
        this.play(message, id);
      }
    } else {
      this.toggleIcons(this.playSpan.childNodes[1], this.playSpan.childNodes[0]);
      window.speechSynthesis.cancel();
    }
  };
  speakFromTooltip = (message, id) => {
    voiceName = this.speech.speechSelect.value;
    this.play(message, id);
  };
  toggleIcons = (n1, n2) => {
    const node1 = n1;
    const node2 = n2;
    node1.style.visibility = 'hidden';
    node2.style.visibility = 'visible';
  };
  render() {
    const { message, lang, isMine } = this.props;
    return (
      <div>
        <div
          className={styles.playContainer}
          onClick={this.speak.bind(this, message.msg, message.id)}
          ref={this.mapRef}
          id={'play' + message.id}
        >
          <MdPlayArrow className={styles.playBtn}/>
          <MdStop style={{ visibility: 'hidden' }}/>
        </div>
        <ToolTip
          horizontalPosition={(isMine && message.msg.length > 15) ? 'left' : 'right'}
          horizontalAlign={(isMine && message.msg.length > 15) ? 'left' : 'right'}
          verticalPosition="bottom"
          arrowSize={5}
          borderColor="#7F7E7E"
          show={this.state.isPlayTooltipActive}
        >
          <div></div>
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
                onClick={this.speakFromTooltip.bind(this, message.msg, message.id)}
              />
              <MdClose className={styles.btn} onClick={this.showPlayTooltip}/>
            </div>
          </div>
        </ToolTip>
      </div>
    );
  }
}

SpeechSynthesis.propTypes = {
  message: PropTypes.object,
  lang: PropTypes.string,
  voicesArr: PropTypes.array,
  isMine: PropTypes.bool
};
