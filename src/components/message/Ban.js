import React, { Component, PropTypes } from 'react';
import MdBlock from 'react-icons/lib/md/block';
import MdClose from 'react-icons/lib/md/close';
import MdReplay from 'react-icons/lib/md/replay';
import styles from '../../chat.scss';

export default class Ban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banned: false
    };
  }
  ban = () => {
    const modalContent = (
      <div>
        <div className={styles.confirmText}>
          {this.props.message.name} will be banned for this discussion
        </div>
        <div className={styles.confirmBtns}>
          <span onClick={this.handleClose}>Cancel</span>
          <span onClick={this.handleConfirm}>Confirm</span>
        </div>
      </div>
    );
    this.props.appStore.openModal(modalContent);
  };
  handleClose = () => {
    this.props.appStore.closeModal();
  };
  handleConfirm = () => {
    this.props.chatStore.ban(this.props.message.id, () => {
      this.setState({
        banned: true
      });
      this.props.appStore.closeModal();
    });
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
          <span className={styles.banSpan}> | </span>
          {
            (this.state.banned) ?
              <span className={styles.banSpan}>Banned</span> :
              <span onClick={this.ban}><MdBlock /><span>Ban for an hour</span></span>
          }
          {this.state.banned}
        </span>
      }
    </div>
    );
  }
}

Ban.propTypes = {
  chatStore: PropTypes.object,
  appStore: PropTypes.object,
  message: PropTypes.object,
  isMine: PropTypes.func,
  onRestore: PropTypes.func,
  deleted: PropTypes.bool
};
