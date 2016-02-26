import React, { Component, PropTypes } from 'react';
import styles from '../ContactList.css';
import ToolTip from 'react-portal-tooltip';
import EditName from './EditName';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';

export default class ContactList extends Component {
  static propTypes = {
    contactItem: PropTypes.object,
    onInfo: PropTypes.func,
    onMessage: PropTypes.func,
    onCall: PropTypes.func,
    onChangeName: PropTypes.func,
    onDelete: PropTypes.func
  };

  state = {
    isTooltipActive: false,
    username: this.props.contactItem.name
  };

  showTooltip = () => {
    this.setState({ isTooltipActive: !this.state.isTooltipActive });
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

  editName = (name) => {
    this.showTooltip();
    this.setState({ username: name });
  };

  deleteContact = (id, name) => {
    let deleted = confirm('You are about to remove ' + name +
      '. All related chats will be closed.');
    if (deleted === true) {
      this.props.onDelete(id, function success() {
        console.log('onDelete success');
      });
    }
  };

  render() {
    const { contactItem, onChangeName } = this.props;
    return (
      <li ref={(ref) => this.avatar = ref}>
        {
          contactItem.avatar ?
            <img className={styles.img} src={contactItem.avatar}/> :
            <span className={styles.txt}>{this.state.username[0]}</span>
        }
        <span>
          <span>{this.state.username}</span>
          <div ref={(ref) => this.optionsLeft = ref} className={styles.optionsLeft}>
            <MdInfo onClick={this.showInfo.bind(this, contactItem.id)}/>
            <MdMessage onClick={this.sendMessage.bind(this, contactItem.id)}/>
            <MdVideocam onClick={this.videoCall.bind(this, contactItem.id)}/>
          </div>
        </span>
        <span className={styles.right}>
          <div className={styles.arrow} onClick={this.toggleInfo}>
            <MdKeyboardArrowDown/>
          </div>
          <div ref={(ref) => this.optionsRight = ref} className={styles.optionsRight}>
            <span id={'a' + contactItem.id} style={{ lineHeight: '0.7' }}>
              <MdEdit onClick={this.showTooltip}/>
            </span>
            <ToolTip
              active={this.state.isTooltipActive}
              position="left" arrow="center"
              parent={'#a' + contactItem.id}
            >
              <EditName
                id={contactItem.id}
                name={this.state.username}
                onChangeName={onChangeName}
                editName={this.editName}
              />
            </ToolTip>
            <MdClose onClick={this.deleteContact.bind(this, contactItem.id, contactItem.name)}/>
          </div>
        </span>
      </li>
    );
  }
}
