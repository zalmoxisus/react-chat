import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from '../chat.scss';
import Message from './message/Message';

@observer(['speakinStore'])
export default class ChatArea extends Component {
  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }

  componentDidUpdate() {
    this.updateScrollTop();
  }

  isMine = id => this.props.speakinStore.me.get('id') === id;

  updateScrollTop = () => {
    const node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  render() {
    const { speakinStore, UserMenu } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          (speakinStore.messages && speakinStore.messages.length > 0) &&
          speakinStore.messages.map(message =>
              <Message key={message.id}
                message={message}
                UserMenu={UserMenu}
                isMine={this.isMine}
              />
          )
        }
      </div>
    );
  }
}

ChatArea.wrappedComponent.propTypes = {
  speakinStore: PropTypes.object,
  UserMenu: PropTypes.func
};
