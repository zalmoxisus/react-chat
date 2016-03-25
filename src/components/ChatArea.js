import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Messages from './messages/Message';

export default class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voicesArr: [],
      add(voice) {
        this.voicesArr.push(voice);
      }
    };
  }

  componentWillMount() {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        for (let i = 0; i < voices.length; i++) {
          let option = voices[i];
          if (option.lang.indexOf(this.props.lang) > -1) {
            this.state.add(option);
            this.setState(this.state);
          }
        }
      };
    }
  }
  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }
  componentDidUpdate() {
    this.updateScrollTop();
  }
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
      nativeLng,
      withPhoto
    } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          messages.map(message =>
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
                nativeLng={nativeLng}
                withPhoto={withPhoto}
              />
          )
        }
      </div>
    );
  }
}

ChatArea.propTypes = {
  messages: PropTypes.array,
  replay: PropTypes.func,
  isMine: PropTypes.func,
  onTranslate: PropTypes.func,
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onBan: PropTypes.func,
  translateLanguages: PropTypes.array,
  lang: PropTypes.string,
  nativeLng: PropTypes.string,
  withPhoto: PropTypes.bool
};