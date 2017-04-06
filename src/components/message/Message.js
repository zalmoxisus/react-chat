import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import Avatar from '../Avatar';
import MessageContent from './MessageContent';
import MessageOptions from './MessageOptions';

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
      this.props.onTranslate(
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
  render() {
    const { message, user, showAvatars, avatarPreviewPosition, updateInputValue,
      UserMenu, onTranslate, translateLanguages, nativeLng, openModal, voices,
      voicesAccess
    } = this.props;
    const isMine = message.user._id === user._id;
    return (
      <div className={styles.msgBox}>
        {showAvatars && message.user._id !== user._id && !isMine &&
          <Avatar className={styles.avatar}
            id={message._id}
            src={message.user.avatar}
            name={message.user.name}
            toolTipPosition={avatarPreviewPosition}
          >
            { UserMenu &&
            <UserMenu
              name={message.name}
              msgId={message.id}
            />
            }
          </Avatar>
        }
        <div className={isMine ? styles.arrowRight : styles.arrowLeft} />
        <div
          key={message._id}
          className={isMine ? styles.myMsg : styles.uMsg}
        >
          {!message.removed &&
            <MessageContent
              {...{ message, isMine, updateInputValue }}
              trLangs={this.state.trLangs}
              deleteBox={this.deleteBox}
            />
          }
          {!message.removed &&
            <MessageOptions
              {...{ message, isMine, onTranslate, translateLanguages, nativeLng,
                openModal, voices, voicesAccess }}
              insertTranslation={this.insertTranslation}
              deleteMsg={this.deleteMsg}
              trLangs={this.state.trLangs}
            />
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string,
  updateInputValue: PropTypes.func,
  UserMenu: PropTypes.any,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array,
  nativeLng: PropTypes.string,
  openModal: PropTypes.func,
  voices: PropTypes.array,
  voicesAccess: PropTypes.bool
};
