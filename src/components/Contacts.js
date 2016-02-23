import React, { Component, PropTypes } from 'react';
import styles from '../ContactList.css';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';

export default class ContactList extends Component {
  static propTypes = {
    name: PropTypes.string,
    src: PropTypes.string
  };

  toggleInfo = (e) => {
    const node = e.currentTarget.children[0];
    if (node.style.transform === 'rotate(180deg)') {
      node.style.transform = 'rotate(0deg)';
      this.avatar.children[0].style.width = '25px';
      this.avatar.children[0].style.height = '25px';
      this.avatar.children[0].style.fontSize = '12px';

      this.optionsLeft.style.display = 'none';
    } else {
      node.style.transform = 'rotate(180deg)';
      this.avatar.children[0].style.width = '48px';
      this.avatar.children[0].style.height = '48px';
      this.avatar.children[0].style.fontSize = '23px';

      this.optionsLeft.style.display = 'flex';
    }
  };

  render() {
    return (
      <li ref={(ref) => this.avatar = ref}>
        {
          this.props.src ?
            <img className={styles.img} src={this.props.src}/> :
            <span className={styles.txt}>{this.props.name[0]}</span>
        }
        <span>
          <span>{this.props.name}</span>
          <div ref={(ref) => this.optionsLeft = ref} className={styles.optionsLeft}>
            <MdInfo/>
            <MdMessage/>
            <MdVideocam/>
          </div>
        </span>
        <div className={styles.arrow} onClick={this.toggleInfo}><MdKeyboardArrowDown/></div>
      </li>
    );
  }
}
