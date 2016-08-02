import React, { Component, PropTypes } from 'react';
import MdMic from 'react-icons/lib/md/mic';
import MdMessage from 'react-icons/lib/md/message';
import MdOndemandVideo from 'react-icons/lib/md/ondemand-video';
import MdImage from 'react-icons/lib/md/image';
import MdClose from 'react-icons/lib/md/close';
import { observer, inject } from 'mobx-react';
import styles from '../../chat.scss';
import convertMedia from '../../utils/convertMedia';

@inject('chatStore') @observer
export default class MessageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      micShow: false,
      submenuShow: false
    };
    this.SpeechRecognition = window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;
  }
  mapRefContainer = (node) => {
    this.videoInpContainer = node;
  };

  changeVideoInp = (e) => {
    let media = convertMedia(e.target.value, 150, true);
    let videoContainer = this.videoInpContainer;
    let mediaContainer = document.createElement('span');

    mediaContainer.innerHTML = media;
    if (videoContainer) {
      if (videoContainer.children.length === 1) videoContainer.appendChild(mediaContainer);
      else videoContainer.replaceChild(mediaContainer, videoContainer.children[1]);
    }


    if (e.nativeEvent.keyCode === 13) {
      const txt = e.target.value;
      if ((txt === '') || (txt === ' ')) return;
      this.props.chatStore.send({ txt }, () => {
        this.handleClose(e);
      });
    } else if (e.nativeEvent.keyCode === 27) {
      this.handleClose(e);
    }
  };

  insertTranslation = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.props.chatStore.translate(
        e.target.value,
        this.props.chatStore.lang,
        txt => {
          this.props.addTranslation(txt);
          this.handleClose();
        }
      );
    } else if (e.nativeEvent.keyCode === 27) {
      this.handleClose(e);
    }
  };

  handleSpeech = (e) => {
    this.setState({ micShow: true });
    const SpeechRecognition = this.SpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.props.chatStore.lang;
      this.recognition.start();
      this.recognition.onresult = (event) => {
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
      this.recognition.onerror = () => {
        this.hideIndicator(e);
      };
      this.recognition.onend = () => {
        this.hideIndicator();
      };
    }
  };

  handleTranslate = () => {
    this.setState({ submenuShow: true });
    this.submenu = (<input autoFocus
      placeholder="Tape a phrase to be translated"
      onKeyUp={this.insertTranslation}
    />);
  };

  handleVideo = () => {
    this.setState({ submenuShow: true });
    this.submenu = (<input autoFocus
      placeholder="Video url (youtube, vimeo)"
      onKeyUp={this.changeVideoInp}
    />);
  };

  handleImage = () => {
    this.setState({ submenuShow: true });
    this.submenu = (<input autoFocus
      placeholder="Image url"
      onKeyUp={this.changeVideoInp}
    />);
  };

  hideIndicator = () => {
    this.recognition.stop();
    this.setState({ micShow: false });
  };
  handleClose = () => {
    this.submenuShow = false;
    this.setState({ submenuShow: false });
  };

  render() {
    const { chatStore } = this.props;
    return (<div className={styles.userContainer}>
        <ul
          className={this.props.chatStore.menuShow ? styles.showUmenu : styles.hideUmenu}
        >
          {
            this.SpeechRecognition ?
            <li onClick={this.handleSpeech}>
              <MdMic /><span>Dictate text</span>
            </li> : null
          }
          {
            (chatStore.translate && chatStore.translateLanguages) ?
            <li onClick={this.handleTranslate}>
              <MdMessage /><span>Translate a phrase</span>
            </li> : null
          }
          <li onClick={this.handleVideo}>
            <MdOndemandVideo /><span>Insert video</span>
          </li>
          <li onClick={this.handleImage}>
            <MdImage /><span>Insert image</span>
          </li>
        </ul>
        {
          (this.state.submenuShow) ?
           <div>
             <div ref={this.mapRefContainer} className={styles.videoInpContainer}>
               {this.submenu}
             </div>
             <div className={styles.btnContainer} onClick={this.handleClose}>
               <MdClose className={styles.iconClear} />
             </div>
           </div> : null
        }
        {
          (this.state.micShow) ?
           <div className={styles.micShow}>
             <MdMic className={styles.iconMic} onClick={this.hideIndicator} />
           </div> : null
        }
      </div>
    );
  }
}
MessageMenu.propTypes = {
  chatStore: PropTypes.object,
  addTranslation: PropTypes.func
};

