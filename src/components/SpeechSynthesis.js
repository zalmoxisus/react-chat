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
    message: PropTypes.object
  };
  state = {
    isPlayTooltipActive: false,
    isPlaying: true
  };
  showPlayTooltip = () => {
    this.setState({ isPlayTooltipActive: !this.state.isPlayTooltipActive });
  };
  showPlayBtn = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };
  prepareForTranslation = (message) => {
    return message.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  };
  play = (message, id) => {
    this.showPlayBtn();
    const msg = new SpeechSynthesisUtterance(this.prepareForTranslation(message));
    const that = this;
    msg.onend = function (event) {
      that.showPlayBtn();
    };
    window.speechSynthesis.speak(msg);
  };

  speak = (message, id, e) => {
    const node = e.currentTarget;
    if (this.state.isPlaying) {
      if (lastSpoken === id) {
        this.showPlayTooltip();
      } else {
        lastSpoken = id;
        this.play(message, id);
      }
    } else {
      window.speechSynthesis.cancel();
    }
  };
  render() {
    const { message } = this.props;
    return (
      <div onClick={this.speak.bind(this, message.msg, message.id)}>
        {
          (this.state.isPlaying) ?
          <MdPlayArrow id={'play' + message.id} /> :
          <MdStop />
        }
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
                ref={(ref) => this.speech = ref}
              />
              <MdCheck className={styles.btn}/>
              <MdClose className={styles.btn} onClick={this.showPlayTooltip}/>
            </div>
          </div>
        </ToolTip>
      </div>
    );
  }
}