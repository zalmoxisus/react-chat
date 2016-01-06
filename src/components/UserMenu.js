import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToggleDisplay from '../utils/ToggleDisplay';
import convertMedia from '../utils/convertMedia';

let recognition;
export default class UserMenu extends Component {
  static propTypes = {
    menuShow: PropTypes.bool,
    onMessage: PropTypes.func,
    addTranslation: PropTypes.func,
    lang: PropTypes.string
  };
  state = {
    micShow: false
  };
  changeVideoInp = (e) => {
    let media = convertMedia(e.target.value, 150, true);
    let videoContainer = this.videoInpContainer;
    let mediaContainer = document.createElement('span');

    mediaContainer.innerHTML = media;
    if (videoContainer.children.length === 3) videoContainer.appendChild(mediaContainer);
    else videoContainer.replaceChild(mediaContainer, videoContainer.children[3]);


    if (e.nativeEvent.keyCode === 13) {
      const input = e.target;
      const txt = e.target.value;
      if (txt === '') return;
      const that = this;
      this.props.onMessage({ txt: txt }, function success() {
        that.handleClose(e);
      });
    }
  };

  translate___ = str => str;

  insertTranslation = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      const str = this.translate___(e.target.value);
      this.props.addTranslation(str);
      this.handleClose(this);
    }
  };

  handleClick = (opt, e) => {
    switch (opt) {
      case 0: {
        this.setState({ micShow: true });
        const that = this;
        const SpeechRecognition = window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition ||
          window.oSpeechRecognition;
        if (SpeechRecognition !== undefined) {
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = that.props.lang;
          recognition.start();
          recognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }
            if (finalTranscript !== '') that.props.addTranslation(finalTranscript);
          };
          recognition.onerror = function(event) {
            that.hideIndicator(e);
          };
          recognition.onend = function() {
            that.hideIndicator();
          };
        }
        break;
      }
      case 1: {
        this.submenuShow = true;
        const that = this;
        setTimeout(function() {
          that.translateInp.focus();
        }, 0);
        this.videoInp.style.display = 'none';
        this.translateInp.style.display = 'block';
        break;
      }
      case 2: {
        this.submenuShow = true;
        const that = this;
        setTimeout(function() {
          that.videoInp.focus();
        }, 0);
        this.translateInp.style.display = 'none';
        this.videoInp.style.display = 'block';
        break;
      }
      default:
    }
  };
  hideIndicator = (e) => {
    recognition.stop();
    this.setState({ micShow: false });
  };
  handleClose = (e) => {
    this.submenuShow = false;
    this.videoInp.value = '';
    this.translateInp.value = '';
    if (this.videoInpContainer.childNodes.length > 3) this.videoInpContainer.removeChild(this.videoInpContainer.childNodes[3]);
  };

  render() {
    return (<div className={styles.userContainer}>
        <ToggleDisplay show={this.props.menuShow}>
          <ul className={styles.usermenu}>
            <li onClick={this.handleClick.bind(this, 0)}>
              <span className="icon-mic"></span><a href="#">Dictate text</a>
            </li>
            <li onClick={this.handleClick.bind(this, 1)}>
              <span className="icon-insert-comment"></span><a href="#">Translate a phrase</a>
            </li>
            <li onClick={this.handleClick.bind(this, 2)}>
              <span className="icon-ondemand-video"></span><a href="#">Insert video</a>
            </li>
          </ul>
        </ToggleDisplay>
        <ToggleDisplay show={this.submenuShow}>
          <div ref={(ref) => this.videoInpContainer = ref} className={styles.videoInpContainer}>
            <input ref={(ref) => this.videoInp = ref} placeholder="Video url (youtube, vimeo)" onKeyUp={this.changeVideoInp}/>
            <input ref={(ref) => this.translateInp = ref} placeholder="Tape a phrase to be translated" onKeyUp={this.insertTranslation}/>
            <div style={{position: 'fixed', left: 0, bottom: '23px', height: '30px' }} onClick={this.handleClose}>
              <p className="icon-clear"></p>
            </div>
          </div>
        </ToggleDisplay>
      <ToggleDisplay show={this.state.micShow}>
        <p className="icon-mic" onClick={this.hideIndicator}></p>
      </ToggleDisplay>
      </div>
    );
  }
}
