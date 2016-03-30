import React, { Component, PropTypes } from 'react';
import styles from '../contactlist.scss';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MenuLeft from './Contacts/MenuLeft';
import MenuRight from './Contacts/MenuRight';
import EditName from './Contacts/EditName';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showInpName: false,
      username: this.props.contactItem.name
    };
  }

  showEdit = () => {
    this.setState({ showInpName: true });
  };

  changeName = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      const name = e.currentTarget.value;
      const id = this.props.contactItem.id;
      this.props.onChangeName(id, name, () => {
        this.setState({ username: name });
      });
      this.setState({ showInpName: false });
    } else if (e.nativeEvent.keyCode === 27) {
      this.setState({ showInpName: false });
    }
  };

  toggleInfo = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { contactItem, onInfo, onMessage, onCall, onDelete } = this.props;
    return (
      <li>
        {
          contactItem.avatar ?
            <img
              className={ (this.state.showMenu) ?
               styles.bigImg : styles.smallImg }
              src={contactItem.avatar}
            /> :
            <span
              className={ (this.state.showMenu) ?
              styles.bigTxt : styles.smallTxt }
            >
              {this.state.username[0]}
            </span>
        }
        <span>
          <div className={styles.username}>{this.state.username}</div>
          {
            (this.state.showMenu) ?
              <MenuLeft
                contactItem={contactItem.id}
                onInfo={onInfo}
                onMessage={onMessage}
                onCall={onCall}
              /> : null
          }
        </span>
        <span className={styles.right}>
          <div className={styles.arrow} onClick={this.toggleInfo}>
            <MdKeyboardArrowDown
              style={(this.state.showMenu) ?
               { transform: 'rotate(180deg)' } :
               { transform: 'rotate(0deg)' } }
            />
          </div>
          {
            (this.state.showMenu) ?
              <MenuRight
                contactItem={contactItem}
                onEdit={this.showEdit}
                onDelete={onDelete}
              /> : null
          }
        </span>
        {
          (this.state.showInpName) ?
            <EditName
              name={this.state.username}
              showInpName={this.state.showInpName}
              onChangeName={this.changeName}
            /> : null
        }
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