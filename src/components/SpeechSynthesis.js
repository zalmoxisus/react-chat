import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import MdClose from 'react-icons/lib/md/close';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';
import MdStop from 'react-icons/lib/md/stop';
import ToolTip from '../utils/Tooltip';
import SpeechSelect from './SpeechSelect';

export default class SpeechSynthesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayTooltipActive: false
    };
  }
  componentDidMount() {
    this.voiceName = this.props.voicesArr[0].name;
  }
  getSanitizedMsg() {
    return this.props.message.msg.replace(/(<([^>]+)>)/ig, '').replace(/\+/g, '');
  }
  mapRef = (node) => {
    this.playSpan = node;
  };
  showPlayTooltip = () => {
    this.setState({ isPlayTooltipActive: !this.state.isPlayTooltipActive });
  };
  play = () => {
    const msg = new SpeechSynthesisUtterance(this.getSanitizedMsg());
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
    msg.voice = voices.filter(voice => voice.name === this.voiceName)[0];
    window.speechSynthesis.speak(msg);
  };

  speak = () => {
    const { id } = this.props.message;
    if (this.playSpan.childNodes[1].style.visibility === 'hidden') {
      if (this.lastSpoken === id && this.props.voicesArr.length > 1) {
        this.showPlayTooltip();
      } else {
        this.lastSpoken = id;
        this.play();
      }
    } else {
      this.toggleIcons(this.playSpan.childNodes[1], this.playSpan.childNodes[0]);
      window.speechSynthesis.cancel();
    }
  };
  speakFromTooltip = (value) => {
    this.voiceName = value;
    this.play();
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
          onClick={this.speak}
          ref={this.mapRef}
          id={'play' + message.id}
        >
          <MdPlayArrow className={styles.playBtn} />
          <MdStop style={{ visibility: 'hidden' }} />
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
                lang={lang}
                value={this.voiceName}
                onChange={this.speakFromTooltip}
              />
              <MdClose className={styles.btn} onClick={this.showPlayTooltip} />
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
