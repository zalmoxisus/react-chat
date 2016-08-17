import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from '../../chat.scss';
import Avatar from '../Avatar';
import MessageOptions from './MessageOptions';
import Ban from './Ban';
import MessageContent from './MessageContent';

@observer(['chatStore', 'appStore', 'contactStore', 'UserMenu'])
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trLangs: [],
      deleted: false,

      add(trLang) {
        this.trLangs.push(trLang);
      },

      delete(trLang) {
        this.trLangs.forEach((item, index, object) => {
          if (item.id === trLang) {
            object.splice(index, 1);
          }
        });
      }
    };
  }
  insertTranslation = (lng, msg) => {
    let isLng = false;
    this.state.trLangs.forEach((item) => {
      if (item.lang === lng) {
        isLng = true;
      }
    });
    if (!isLng) {
      this.props.chatStore.translate(
        msg, lng, txt => {
          const trLang = {
            id: 'tr' + (Date.now() / 1000 | 0),
            lang: lng,
            txt
          };
          this.state.add(trLang);
          this.setState(this.state);
        }
      );
    }
  };
  deleteBox = (trLang) => {
    this.state.delete(trLang);
    this.setState(this.state);
  };
  deleteMsg = () => {
    this.setState({ deleted: true });
  };
  restoreMsg = () => {
    this.setState({ deleted: false });
    this.props.chatStore.restore(this.props.message, () => {
    });
  };
  render() {
    const { message, isMine, UserMenu, chatStore, appStore } = this.props;
    return (
      <div className={styles.msgBox}>
        {
          chatStore.withPhoto &&
          !isMine(message.sender) &&
          ((typeof message.showAvatars === 'undefined') ? true : message.showAvatars) &&
          <Avatar className={styles.avatar}
            id={message.id}
            src={message.avatar}
            name={message.name}
          >
            <UserMenu {...this.props} />
          </Avatar>
        }
        <div className={isMine(message.sender) ? styles.arrowRight : styles.arrowLeft}>
        </div>
        <div
          key={message.msg}
          className={isMine(message.sender) ? styles.myMsg : styles.uMsg}
        >
          {
            (!this.state.deleted) ?
              <MessageContent
                message={message}
                isMine={isMine}
                trLangs={this.state.trLangs}
                deleteBox={this.deleteBox}
                deleted={this.state.deleted}
              /> : null
          }
          {
            (!this.state.deleted) ?
              <MessageOptions
                message={message}
                isMine={isMine}
                insertTranslation={this.insertTranslation}
                deleteMsg={this.deleteMsg}
                chatStore={chatStore}
                appStore={appStore}
              /> : null
          }
          {
            (this.state.deleted) ?
              <Ban
                message={message}
                isMine={isMine}
                onRestore={this.restoreMsg}
                deleted={this.state.deleted}
                chatStore={chatStore}
                appStore={appStore}
              /> : null
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  chatStore: PropTypes.object,
  contactStore: PropTypes.object,
  appStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  UserMenu: PropTypes.node
};
