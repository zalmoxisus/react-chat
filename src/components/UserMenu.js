import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToggleDisplay from '../utils/ToggleDisplay';
import convertMedia from '../utils/convertMedia';
import MdMic from 'react-icons/lib/md/mic';
import MdMessage from 'react-icons/lib/md/message';
import MdOndemandVideo from 'react-icons/lib/md/ondemand-video';
import MdImage from 'react-icons/lib/md/image';
import MdClose from 'react-icons/lib/md/close';

let SpeechRecognition;
let recognition;
export default class UserMenu extends Component {
  static propTypes = {
    menuShow: PropTypes.bool,
    onSend: PropTypes.func,
    addTranslation: PropTypes.func,
    lang: PropTypes.string,
    onTranslate: PropTypes.func,
    translateLanguages: PropTypes.array
  };
  static defaultProps = {
    lang: 'en'
  };
  state = {
    micShow: false,
    submenuShow: false
  };
  componentWillMount() {
    SpeechRecognition = window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;
  }
  componentDidMount() {
    if (!SpeechRecognition && (!this.props.onTranslate || !this.props.translateLanguages)) {
      this.usermenu.style.marginTop = '-60px';
    } else if (!SpeechRecognition || !this.props.onTranslate || !this.props.translateLanguages) {
      this.usermenu.style.marginTop = '-90px';
    }
  }
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
      if ((txt === '') || (txt === ' ')) return;
      this.props.onSend({ txt }, () => {
        this.handleClose(e);
      });
    } else if (e.nativeEvent.keyCode === 27) {
      this.handleClose(e);
    }
  };

  insertTranslation = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.props.onTranslate(
        e.target.value,
        this.props.lang,
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
        if (SpeechRecognition) {
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = this.props.lang;
          recognition.start();
          recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }
            if (finalTranscript !== '') this.props.addTranslation(finalTranscript);
          };
          recognition.onerror = (event) => {
            this.hideIndicator(e);
          };
          recognition.onend = () => {
            this.hideIndicator();
          };
        }
        break;
      }
      case 1: {
        this.setState({ submenuShow: true });
        setTimeout(() => {
          this.translateInp.focus();
        }, 0);
        this.translateInp.style.zIndex = 1;
        break;
      }
      case 2: {
        this.setState({ submenuShow: true });
        setTimeout(() => {
          this.videoInp.focus();
        }, 0);
        this.videoInp.style.zIndex = 1;
        break;
      }
      case 3: {
        this.setState({ submenuShow: true });
        setTimeout(() => {
          this.imgInp.focus();
        }, 0);
        this.imgInp.style.zIndex = 1;
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
    this.imgInp.value = '';
    if (this.videoInpContainer.childNodes.length > 3) {
      this.videoInpContainer.removeChild(this.videoInpContainer.childNodes[3]);
    }
    this.translateInp.style.zIndex = 0;
    this.videoInp.style.zIndex = 0;
    this.imgInp.style.zIndex = 0;
  };

  render() {
    const { menuShow, onTranslate, translateLanguages } = this.props;
    return (<div className={styles.userContainer}>
        <ul
          className={menuShow ? styles.showUmenu : styles.hideUmenu}
          ref={(ref) => this.usermenu = ref}
        >
          {
            SpeechRecognition ?
            <li onClick={this.handleClick.bind(this, 0)}>
              <MdMic /><a href="#">Dictate text</a>
            </li> : null
          }
          {
            (onTranslate && translateLanguages) ?
            <li className={styles.liTranslate} onClick={this.handleClick.bind(this, 1)}>
              <MdMessage /><a href="#">Translate a phrase</a>
            </li> : null
          }
          <li className={styles.liVideo} onClick={this.handleClick.bind(this, 2)}>
            <MdOndemandVideo /><a href="#">Insert video</a>
          </li>
          <li className={styles.liImage} onClick={this.handleClick.bind(this, 3)}>
            <MdImage /><a href="#">Insert image</a>
          </li>
        </ul>
        <ToggleDisplay show={this.state.submenuShow}>
          <div ref={(ref) => this.videoInpContainer = ref} className={styles.videoInpContainer}>
            <input
              ref={(ref) => this.videoInp = ref}
              placeholder="Video url (youtube, vimeo)"
              onKeyUp={this.changeVideoInp}
              style={{ position: 'relative' }}
            />
            <input
              ref={(ref) => this.translateInp = ref}
              placeholder="Tape a phrase to be translated"
              onKeyUp={this.insertTranslation}
              style={{ position: 'absolute', top: '15px', width: '88%' }}
            />
            <input
              ref={(ref) => this.imgInp = ref}
              placeholder="Image url"
              onKeyUp={this.changeVideoInp}
              style={{ position: 'absolute', top: '15px', width: '88%' }}
            />
          </div>
          <div className={styles.btnContainer}
            onClick={this.handleClose}
            ref={(ref) => this.btnContainer = ref}
          >
            <MdClose className={styles.iconClear} />
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.micShow} className={styles.micShow}>
          <MdMic className={styles.iconMic} onClick={this.hideIndicator} />
        </ToggleDisplay>
      </div>
    );
  }
}
