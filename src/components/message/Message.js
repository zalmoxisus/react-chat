import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import styles from '../../chat.scss';
import Avatar from '../Avatar';
import MessageContent from './MessageContent';
import MessageOptions from './MessageOptions';
import Ban from './Ban';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trLangs: [],

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
  removeMsg = () => {
    this.props.manageMessage(this.props.message._id, true, () => {
    });
  };
  restoreMsg = () => {
    this.props.manageMessage(this.props.message._id, false, () => {
    });
  };
  render() {
    const { message, user, showAvatars, avatarPreviewPosition, updateInputValue,
      UserMenu, onTranslate, translateLanguages, nativeLng, handleModal, voices, ban,
      manageMessage
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
              {...{ user, handleModal }}
              msgId={message._id}
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
                handleModal, voices, ban, manageMessage }}
              insertTranslation={this.insertTranslation}
              removeMsg={this.removeMsg}
              trLangs={this.state.trLangs}
            />
          }
          {message.removed &&
            <Ban
              {...{ message, isMine, ban, handleModal }}
              onRestore={this.restoreMsg}
              deleted={message.deleted}
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
    _id: PropTypes.any
  }).isRequired,
  showAvatars: PropTypes.bool,
  avatarPreviewPosition: PropTypes.string,
  updateInputValue: PropTypes.func,
  UserMenu: PropTypes.any,
  onTranslate: PropTypes.func,
  translateLanguages: PropTypes.array,
  nativeLng: PropTypes.string,
  handleModal: PropTypes.func,
  voices: PropTypes.array,
  manageMessage: PropTypes.func,
  ban: PropTypes.func
};
