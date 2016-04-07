import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

export default class Chat extends Component {
  replay = (e) => {
    const name = e.currentTarget.textContent;
    const node = this.input.usermsg;
    node.value = name + ', ' + node.value;
    node.focus();
  };
  isMine = id => this.props.userId === id;

  render() {
    const {
      messages, lang, onSend, onTranslate, withPhoto, openModal, closeModal,
      onDelete, translateLanguages, nativeLng, onRestore, onBan,
      toolTipPosition } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea messages={messages}
          replay={this.replay}
          isMine={this.isMine}
          onTranslate={onTranslate}
          onDelete={onDelete}
          onRestore={onRestore}
          onBan={onBan}
          lang={lang}
          translateLanguages={translateLanguages}
          nativeLng={nativeLng}
          withPhoto={withPhoto}
          openModal={openModal}
          closeModal={closeModal}
          toolTipPosition={toolTipPosition}
        />
        <ChatInput
          onSend={onSend}
          lang={lang}
          onTranslate={onTranslate}
          translateLanguages={translateLanguages}
          ref={node => {this.input = node;}}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  onSend: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  lang: PropTypes.string,
  onTranslate: PropTypes.func,
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onBan: PropTypes.func,
  translateLanguages: PropTypes.array,
  nativeLng: PropTypes.string,
  withPhoto: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  toolTipPosition: PropTypes.string
};

Chat.defaultProps = {
  messages: []
};