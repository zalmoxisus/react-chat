import React, { Component, PropTypes } from 'react';
import styles from '../ContactList.css';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';

export default class ContactList extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    onInfo: PropTypes.func,
    onMessage: PropTypes.func,
    onCall: PropTypes.func
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

  showInfo = () => {
    this.props.onInfo();
  };

  sendMessage = () => {
    this.props.onMessage();
  };
  videoCall = () => {
    this.props.onCall();
  };

  render() {
    const { name, avatar } = this.props;
    return (
      <li ref={(ref) => this.avatar = ref}>
        {
          this.props.avatar ?
            <img className={styles.img} src={avatar}/> :
            <span className={styles.txt}>{name[0]}</span>
        }
        <span>
          <span>{name}</span>
          <div ref={(ref) => this.optionsLeft = ref} className={styles.optionsLeft}>
            <MdInfo onClick={this.showInfo}/>
            <MdMessage onClick={this.sendMessage}/>
            <MdVideocam onClick={this.videoCall}/>
          </div>
        </span>
        <span className={styles.right}>
          <div className={styles.arrow} onClick={this.toggleInfo}>
            <MdKeyboardArrowDown/>
          </div>
          <div ref={(ref) => this.optionsRight = ref} className={styles.optionsRight}>
            <MdEdit/>
            <MdClose/>
          </div>
        </span>
      </li>
    );
  }
}
