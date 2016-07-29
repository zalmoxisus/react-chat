import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import Avatar from '../Avatar';
import MessageOptions from './MessageOptions';
import Ban from './Ban';
import MessageContent from './MessageContent';
import { observer, inject } from 'mobx-react';

@inject('chatViewStore') @observer
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
      this.props.chatViewStore.translate(
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
    this.props.chatViewStore.restore(this.props.message, () => {
    });
  };
  render() {
    const {
      message, isMine, replay, withPhoto, openModal, closeModal,
      toolTipPosition, userMenu } = this.props;
    return (
      <div className={styles.msgBox}>
        {
          withPhoto &&
          !isMine(message.sender) &&
          ((typeof message.showAvatars === 'undefined') ? true : message.showAvatars) &&
          <Avatar className={styles.avatar}
            id={message.id}
            src={message.avatar}
            name={message.name}
            toolTipPosition={toolTipPosition}
          >
            {(userMenu) && React.cloneElement(userMenu, { message })}
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
                replay={replay}
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
                openModal={openModal}
                closeModal={closeModal}
              /> : null
          }
          {
            (this.state.deleted) ?
              <Ban
                message={message}
                isMine={isMine}
                onRestore={this.restoreMsg}
                deleted={this.state.deleted}
                openModal={openModal}
                closeModal={closeModal}
              /> : null
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  chatViewStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  replay: PropTypes.func,
  withPhoto: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  toolTipPosition: PropTypes.string,
  userMenu: PropTypes.node
};
