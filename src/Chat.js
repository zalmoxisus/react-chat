import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onMessage: PropTypes.func.isRequired,
    me: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      lng: PropTypes.string
    }).isRequired,
    onTranslate: PropTypes.func
  };

  static defaultProps = {
    messages: []
  };

  replay = (e) => {
    const name = e.currentTarget.textContent;
    const node = this.input.usermsg;
    node.value = name + ', ' + node.value;
    node.focus();
  };
  isMine = id => this.props.me.id === id;

  render() {
    const { messages, me, onMessage, onTranslate } = this.props;
    return (<div>
        <div className={styles.base}>
          <ChatArea messages={messages} replay={this.replay} isMine={this.isMine} />
          <ChatInput
            onMessage={onMessage}
            lng={me.lng}
            onTranslate={onTranslate}
            ref={node => {this.input = node;}}
          />
        </div>
      </div>
    );
  }
}
