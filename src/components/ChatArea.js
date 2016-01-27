import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import Messages from './Message';

export default class ChatArea extends Component {
  static propTypes = {
    messages: PropTypes.array,
    replay: PropTypes.func,
    isMine: PropTypes.func,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func
  };

  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }
  componentDidUpdate = () => {
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
    const { messages, replay, isMine, onTranslate, onDelete } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          messages.map(message => {
            return (
              <Messages key={message.id}
                message={message}
                replay={replay}
                isMine={isMine}
                onTranslate={onTranslate}
                onDelete={onDelete}
              />
            );
          })
        }
      </div>
    );
  }
}
