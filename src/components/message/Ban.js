import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdBlock from 'react-icons/lib/md/block';
import MdClose from 'react-icons/lib/md/close';
import MdReplay from 'react-icons/lib/md/replay';

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
    this.props.openModal(modalContent);
  };
  handleClose = () => {
    this.props.closeModal();
  };
  handleConfirm = () => {
    this.props.onBan(this.props.message.id, () => {
      this.setState({
        banned: true
      });
      this.props.closeModal();
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
          <span style={{ color: '#bbb' }}> | </span>
          {
            (this.state.banned) ?
              <span style={{ color: '#bbb', cursor: 'default' }}>Banned</span> :
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
  message: PropTypes.object,
  onBan: PropTypes.func,
  isMine: PropTypes.func,
  onRestore: PropTypes.func,
  deleted: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func
};