import React, { Component, PropTypes } from 'react';
import styles from '../../ContactList.css';
import MdEdit from 'react-icons/lib/md/edit';
import MdClose from 'react-icons/lib/md/close';

export default class MenuRight extends Component {
  deleteContact = () => {
    const contactItem = this.props.contactItem;
    let deleted = confirm('You are about to remove ' + contactItem.name +
      '. All related chats will be closed.');
    if (deleted === true) {
      this.props.onDelete(contactItem.id, () => {
        console.log('onDelete success');
      });
    }
  };
  render() {
    const { contactItem, onEdit } = this.props;
    return (
      <div className={styles.optionsRight}>
        <span id={'a' + contactItem.id}>
          <MdEdit onClick={onEdit} />
        </span>
        <MdClose onClick={this.deleteContact} />
      </div>
    );
  }
}

MenuRight.propTypes = {
  contactItem: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};