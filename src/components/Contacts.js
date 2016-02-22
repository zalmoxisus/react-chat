import React, { Component, PropTypes } from 'react';
import styles from '../ContactList.css';

export default class ContactList extends Component {
  static propTypes = {
    name: PropTypes.string,
    src: PropTypes.string
  };

  render() {
    return (
      <li>
        {
          this.props.src ?
            <img className={styles.img} src={this.props.src}/> :
            <div className={styles.txt}>{name[0]}</div>
        }
        <span>{this.props.name}</span>
      </li>
    );
  }
}
