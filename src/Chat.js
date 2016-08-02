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
      openModal, closeModal, userMenu } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          replay={this.replay}
          isMine={this.isMine}
          openModal={openModal}
          closeModal={closeModal}
          userMenu={userMenu}
        />
        <ChatInput
          ref={node => {this.input = node;}}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  userId: PropTypes.string.isRequired,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  userMenu: PropTypes.node
};

