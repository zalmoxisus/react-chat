import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToggleDisplay from '../utils/ToggleDisplay';
import convertMedia from '../utils/convertMedia';
import MdMic from 'react-icons/lib/md/mic';
import MdMessage from 'react-icons/lib/md/message';
import MdOndemandVideo from 'react-icons/lib/md/ondemand-video';
import MdClose from 'react-icons/lib/md/close';

let recognition;
export default class UserMenu extends Component {
  static propTypes = {
    menuShow: PropTypes.bool,
    onSend: PropTypes.func,
    addTranslation: PropTypes.func,
    lng: PropTypes.string,
    onTranslate: PropTypes.func
  };
  static defaultProps = {
    lng: 'en'
  };
  state = {
    micShow: false,
    submenuShow: false
  };
  changeVideoInp = (e) => {
    let media = convertMedia(e.target.value, 150, true);
    let videoContainer = this.videoInpContainer;
    let mediaContainer = document.createElement('span');

    mediaContainer.innerHTML = media;
    if (videoContainer.children.length === 2) videoContainer.appendChild(mediaContainer);
    else videoContainer.replaceChild(mediaContainer, videoContainer.children[2]);


    if (e.nativeEvent.keyCode === 13) {
      const input = e.target;
      const txt = e.target.value;
      if ((txt === '') || (txt === ' ')) return;
      const that = this;
      this.props.onSend({ txt }, function success() {
        that.handleClose(e);
      });
    } else if (e.nativeEvent.keyCode === 27) {
      this.handleClose(e);
    }
  };

  showTranslate() {
    if (this.usermenu && !this.props.onTranslate) {
      this.usermenu.style.marginTop = '-61px';
    }
    return (this.props.onTranslate) ? true : false;
  }

  insertTranslation = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.props.onTranslate(
        e.target.value,
        this.props.lng,
        txt => {
          this.props.addTranslation(txt);
          this.handleClose();
        }
      );
    } else if (e.nativeEvent.keyCode === 27) {
      this.handleClose(e);
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
          recognition.lang = that.props.lng;
          recognition.start();
          recognition.onresult = function (event) {
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
          recognition.onerror = function (event) {
            that.hideIndicator(e);
          };
          recognition.onend = function () {
            that.hideIndicator();
          };
        }
        break;
      }
      case 1: {
        this.setState({ submenuShow: true });
        const that = this;
        setTimeout(function () {
          that.translateInp.focus();
        }, 0);
        this.videoInp.style.display = 'none';
        this.translateInp.style.display = 'block';
        break;
      }
      case 2: {
        this.setState({ submenuShow: true });
        const that = this;
        setTimeout(function () {
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
    this.setState({ submenuShow: false });
    this.videoInp.value = '';
    this.translateInp.value = '';
    if (this.videoInpContainer.childNodes.length > 2) {
      this.videoInpContainer.removeChild(this.videoInpContainer.childNodes[2]);
    }
  };

  render() {
    return (<div className={styles.userContainer}>
        <ToggleDisplay show={this.props.menuShow}>
          <ul className={styles.usermenu} ref={(ref) => this.usermenu = ref}>
            <li onClick={this.handleClick.bind(this, 0)}>
              <MdMic /><a href="#">Dictate text</a>
            </li>
            <ToggleDisplay show={this.showTranslate()}>
              <li onClick={this.handleClick.bind(this, 1)}>
                <MdMessage /><a href="#">Translate a phrase</a>
              </li>
            </ToggleDisplay>
            <li onClick={this.handleClick.bind(this, 2)}>
              <MdOndemandVideo /><a href="#">Insert video</a>
            </li>
          </ul>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.submenuShow}>
          <div ref={(ref) => this.videoInpContainer = ref} className={styles.videoInpContainer}>
            <input
              ref={(ref) => this.videoInp = ref}
              placeholder="Video url (youtube, vimeo)"
              onKeyUp={this.changeVideoInp}
            />
            <input
              ref={(ref) => this.translateInp = ref}
              placeholder="Tape a phrase to be translated"
              onKeyUp={this.insertTranslation}
            />
          </div>
          <div className={styles.btnContainer} onClick={this.handleClose}>
            <MdClose className={styles.iconClear} />
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.micShow} className={styles.btnContainer}>
          <MdMic className={styles.iconMic} onClick={this.hideIndicator} />
        </ToggleDisplay>
      </div>
    );
  }
}
