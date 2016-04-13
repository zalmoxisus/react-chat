import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import Message from './message/Message';

export default class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voicesArr: [],
      add(voice) {
        this.voicesArr.push(voice);
      }
    };
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
      messages, replay, isMine, onTranslate, onDelete, onRestore,
      onBan, translateLanguages, lang, nativeLng, withPhoto, openModal,
      closeModal, toolTipPosition, userMenu } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          (messages && messages.length > 0) &&
          messages.map(message =>
              <Message key={message.id}
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
                openModal={openModal}
                closeModal={closeModal}
                toolTipPosition={toolTipPosition}
                userMenu={userMenu}
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
  withPhoto: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  toolTipPosition: PropTypes.string,
  userMenu: PropTypes.node
};
