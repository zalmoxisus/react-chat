import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from '../chat.scss';
import Message from './message/Message';

@inject('chatStore', 'chatViewStore') @observer
export default class ChatArea extends Component {
  componentDidMount() {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        for (let i = 0; i < voices.length; i++) {
          let option = voices[i];
          if (option.lang.indexOf(this.props.chatViewStore.lang) > -1 &&
            this.props.chatViewStore.addVoice) {
            this.props.chatViewStore.addVoice(option);
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
      chatStore, replay, isMine, openModal,
      closeModal, userMenu } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          (chatStore.messages && chatStore.messages.length > 0) &&
          chatStore.messages.map(message =>
              <Message key={message.id}
                message={message}
                replay={replay}
                isMine={isMine}
                openModal={openModal}
                closeModal={closeModal}
                userMenu={userMenu}
              />
          )
        }
      </div>
    );
  }
}

ChatArea.propTypes = {
  chatStore: PropTypes.object,
  chatViewStore: PropTypes.object,
  replay: PropTypes.func,
  isMine: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  userMenu: PropTypes.node
};
