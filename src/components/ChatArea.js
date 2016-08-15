import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from '../chat.scss';
import Message from './message/Message';

@observer(['chatStore', 'appStore'])
export default class ChatArea extends Component {
  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }

  componentDidUpdate() {
    this.updateScrollTop();
  }

  isMine = id => this.props.appStore.me.id === id;

  updateScrollTop = () => {
    let node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  render() {
    const { chatStore, replay } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          (chatStore.messages && chatStore.messages.length > 0) &&
          chatStore.messages.map(message =>
              <Message key={message.id}
                message={message}
                replay={replay}
                isMine={this.isMine}
              />
          )
        }
      </div>
    );
  }
}

ChatArea.propTypes = {
  appStore: PropTypes.object,
  chatStore: PropTypes.object,
  replay: PropTypes.func
};
