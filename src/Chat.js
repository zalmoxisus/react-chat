import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';
import { inject } from 'mobx-react';

@inject('chatStore')
export default class Chat extends Component {
  replay = (e) => {
    const name = e.currentTarget.textContent;
    const node = this.input.usermsg;
    node.value = name + ', ' + node.value;
    node.focus();
  };
  isMine = id => this.props.chatStore.me.id === id;

  render() {
    const {
      lang, withPhoto, openModal, closeModal,
      nativeLng, userMenu, toolTipPosition } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          replay={this.replay}
          isMine={this.isMine}
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
  chatStore: PropTypes.object,
  lang: PropTypes.string,
  onDelete: PropTypes.func,
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
