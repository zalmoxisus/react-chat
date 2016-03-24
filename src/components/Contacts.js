import React, { Component, PropTypes } from 'react';
import styles from '../ContactList.css';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.contactItem.name
    };
  }

  mapRefAvatar = (node) => {
    this.avatar = node;
  };
  mapRefLeft = (node) => {
    this.optionsLeft = node;
  };
  mapRefRight = (node) => {
    this.optionsRight = node;
  };
  mapRefName = (node) => {
    this.editNameInp = node;
  };

  showEdit = () => {
    const editName = this.editNameInp;
    const editInput = editName.children[0];
    editName.style.display = 'block';
    editInput.value = this.state.username;
    editInput.focus();
  };

  changeName = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      const name = e.currentTarget.value;
      const id = this.props.contactItem.id;
      this.props.onChangeName(id, name, () => {
        this.setState({ username: name });
      });
      const editName = this.editNameInp;
      editName.style.display = 'none';
    } else if (e.nativeEvent.keyCode === 27) {
      const editName = this.editNameInp;
      editName.style.display = 'none';
    }
  };

  toggleInfo = (e) => {
    const node = e.currentTarget.children[0];
    const avatarStyle = this.avatar.children[0].style;
    const leftStyle = this.optionsLeft.style;
    const rightStyle = this.optionsRight.style;
    if (node.style.transform === 'rotate(180deg)') {
      node.style.transform = 'rotate(0deg)';
      avatarStyle.width = '25px';
      avatarStyle.height = '25px';
      avatarStyle.fontSize = '12px';

      leftStyle.display = 'none';
      rightStyle.display = 'none';
    } else {
      node.style.transform = 'rotate(180deg)';
      avatarStyle.width = '54px';
      avatarStyle.height = '54px';
      avatarStyle.fontSize = '25px';

      leftStyle.display = 'flex';
      rightStyle.display = 'flex';
    }
  };

  showInfo = (id) => {
    this.props.onInfo(id);
  };
  sendMessage = (id) => {
    this.props.onMessage(id);
  };
  videoCall = (id) => {
    this.props.onCall(id);
  };

  deleteContact = (id, name) => {
    let deleted = confirm('You are about to remove ' + name +
      '. All related chats will be closed.');
    if (deleted === true) {
      this.props.onDelete(id, () => {
        console.log('onDelete success');
      });
    }
  };

  render() {
    const { contactItem } = this.props;
    return (
      <li ref={this.mapRefAvatar}>
        {
          contactItem.avatar ?
            <img className={styles.img} src={contactItem.avatar} /> :
            <span className={styles.txt}>{this.state.username[0]}</span>
        }
        <span>
          <div className={styles.username}>{this.state.username}</div>
          <div ref={this.mapRefLeft} className={styles.optionsLeft}>
            <MdInfo onClick={this.showInfo.bind(this, contactItem.id)} />
            <MdMessage onClick={this.sendMessage.bind(this, contactItem.id)} />
            <MdVideocam onClick={this.videoCall.bind(this, contactItem.id)} />
          </div>
        </span>
        <span className={styles.right}>
          <div className={styles.arrow} onClick={this.toggleInfo}>
            <MdKeyboardArrowDown />
          </div>
          <div ref={this.mapRefRight} className={styles.optionsRight}>
            <span id={'a' + contactItem.id} style={{ lineHeight: '0.7' }}>
              <MdEdit onClick={this.showEdit} />
            </span>
            <MdClose onClick={this.deleteContact.bind(this, contactItem.id, contactItem.name)} />
          </div>
        </span>
        <div ref={this.mapRefName} className={styles.editContainer}>
          <input onKeyDown={this.changeName} className={styles.editInput} maxLength="45" />
        </div>
      </li>
    );
  }
}

Contacts.propTypes = {
  contactItem: PropTypes.object,
  onInfo: PropTypes.func,
  onMessage: PropTypes.func,
  onCall: PropTypes.func,
  onChangeName: PropTypes.func,
  onDelete: PropTypes.func
};