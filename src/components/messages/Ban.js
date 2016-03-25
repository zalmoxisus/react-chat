import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdBlock from 'react-icons/lib/md/block';
import MdClose from 'react-icons/lib/md/close';
import MdReplay from 'react-icons/lib/md/replay';

export default class Ban extends Component {
  ban = (e) => {
    const message = this.props.message;
    let banned = confirm(message.name + ' will be banned for this discussion');
    if (banned === true) {
      this.props.onBan(message.id, () => {
        const node = e.currentTarget;
        node.innerHTML = 'Banned';
        node.style.color = '#bbb';
        node.style.cursor = 'default';
        node.onclick = function (event) {
          event.stopPropagation();
        };
      });
    }
  };
  render() {
    const { message, isMine, onRestore } = this.props;
    return (
    <div className={styles.restoreMsg}>
      <div>
        <MdClose />
        <span>Message deleted</span>
      </div>
            <span onClick={onRestore}>
              <MdReplay />
              <span>Restore the message</span>
            </span>
      {isMine(message.sender) ?
        null :
        <span>
          <span style={{ color: '#bbb' }}> | </span>
          <span onClick={this.ban}>
            <MdBlock />
            <span>Ban for an hour</span>
          </span>
        </span>
      }
    </div>
    );
  }
}

Ban.propTypes = {
  message: PropTypes.object,
  onBan: PropTypes.func,
  isMine: PropTypes.func,
  onRestore: PropTypes.func,
  deleted: PropTypes.bool
};