import React, { Component, PropTypes } from 'react';
import styles from '../contactlist.scss';
import Avatar from './Avatar';

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
      const name = e.target.value;
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
    const { contactItem, toolTipPosition } = this.props;
    return (
      <li>
        <Avatar className={styles.avatar}
          id={contactItem.id}
          src={contactItem.avatar}
          name={contactItem.name}
          toolTipPosition={toolTipPosition}
          borderRadius="0"
        />
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
  onDelete: PropTypes.func,
  toolTipPosition: PropTypes.string
};