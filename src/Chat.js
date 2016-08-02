import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './chat.scss';

@inject('appStore') @observer
export default class Chat extends Component {
  replay = (e) => {
    const name = e.currentTarget.textContent;
    const node = this.input.usermsg;
    node.value = name + ', ' + node.value;
    node.focus();
  };
  isMine = id => this.props.appStore.me.id === id;

  render() {
    const { userMenu } = this.props;
    return (
      <div className={styles.base}>
        <ChatArea
          replay={this.replay}
          isMine={this.isMine}
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
  appStore: PropTypes.object,
  userMenu: PropTypes.node
};

