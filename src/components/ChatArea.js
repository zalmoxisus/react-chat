import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from '../chat.scss';
import Message from './message/Message';

@observer(['store'])
export default class ChatArea extends Component {
  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }

  componentDidUpdate() {
    this.updateScrollTop();
  }

  isMine = id => this.props.store.me.get('id') === id;

  updateScrollTop = () => {
    const node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  render() {
    const { store, UserMenu } = this.props;
    return (
      <div id="container" className={styles.container}>
        {
          (store.messages && store.messages.length > 0) &&
          store.messages.map(message =>
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
  store: PropTypes.object,
  UserMenu: PropTypes.func
};
