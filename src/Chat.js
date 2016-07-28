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
      lang, withPhoto, openModal, closeModal,
      onDelete, nativeLng, onRestore, onBan, userMenu,
      toolTipPosition } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          replay={this.replay}
          isMine={this.isMine}
          onDelete={onDelete}
          onRestore={onRestore}
          onBan={onBan}
          lang={lang}
          nativeLng={nativeLng}
          withPhoto={withPhoto}
          openModal={openModal}
          closeModal={closeModal}
          toolTipPosition={toolTipPosition}
          userMenu={userMenu}
        />
        <ChatInput
          lang={lang}
          ref={node => {this.input = node;}}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  userId: PropTypes.string.isRequired,
  lang: PropTypes.string,
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onBan: PropTypes.func,
  nativeLng: PropTypes.string,
  withPhoto: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  toolTipPosition: PropTypes.string,
  userMenu: PropTypes.node
};

Chat.defaultProps = {
  toolTipPosition: 'right'
};
