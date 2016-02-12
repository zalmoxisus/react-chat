import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import Messages from './Message';

let msgCount = 0;
export default class ChatArea extends Component {
  static propTypes = {
    messages: PropTypes.array,
    replay: PropTypes.func,
    isMine: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    onBan: PropTypes.func,
    translateLanguages: PropTypes.array,
    lang: PropTypes.string,
    nativeLng: PropTypes.string
  };

  state = {
    voicesArr: [],
    add(voice) {
      this.voicesArr.push(voice);
    }
  };

  componentWillMount() {
    const that = this;
    window.speechSynthesis.onvoiceschanged = function (e) {
      const voices = window.speechSynthesis.getVoices();
      let voicesByLang = [];
      for (let i = 0; i < voices.length; i++) {
        let option = voices[i];
        if (option.lang.indexOf(that.props.lang) > -1) {
          that.state.add(option);
          that.setState(that.state);
        }
      }
    };
  }
  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }
  componentDidUpdate = () => {
    msgCount = 0;
    const msg = this.messages.message.childNodes[1];
    if (msg && msg.style.backgroundImage === 'url("//cdnjs.cloudflare.com/ajax/libs/emojione/1.5.2/assets/sprites/emojione.sprites.png")') { // eslint-disable-line max-len
      msg.style.fontSize = '34px';
    }
    this.updateScrollTop();
  };
  updateScrollTop = () => {
    let node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  render() {
    const {
      messages,
      replay,
      isMine,
      onTranslate,
      onDelete,
      onRestore,
      onBan,
      translateLanguages,
      lang,
      nativeLng
    } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          messages.map(message => {
            msgCount++;
            return (
              <Messages key={message.id}
                message={message}
                replay={replay}
                isMine={isMine}
                onTranslate={onTranslate}
                onDelete={onDelete}
                onRestore={onRestore}
                onBan={onBan}
                translateLanguages={translateLanguages}
                lang={lang}
                voicesArr={this.state.voicesArr}
                msgCount={msgCount}
                nativeLng={nativeLng}
                ref={(ref) => this.messages = ref}
              />
            );
          })
        }
      </div>
    );
  }
}
