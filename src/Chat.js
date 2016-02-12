import React, { Component, PropTypes } from 'react';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import styles from './Chat.css';

export default class Chat extends Component {
  static propTypes = {
    messages: PropTypes.array,
    onSend: PropTypes.func.isRequired,
    me: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }).isRequired,
    lang: PropTypes.string,
    onTranslate: PropTypes.func,
    onDelete: PropTypes.func,
    onRestore: PropTypes.func,
    onBan: PropTypes.func,
    translateLanguages: PropTypes.array,
    nativeLng: PropTypes.string
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
    const {
      messages, me, lang, onSend, onTranslate,
      onDelete, translateLanguages, nativeLng, onRestore, onBan } = this.props;
    return (<div>
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
          />
          <ChatInput
            onSend={onSend}
            lang={lang}
            onTranslate={onTranslate}
            translateLanguages={translateLanguages}
            ref={node => {this.input = node;}}
          />
        </div>
      </div>
    );
  }
}
