import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdBlock from 'react-icons/lib/md/block';
import MdClose from 'react-icons/lib/md/close';
import MdReplay from 'react-icons/lib/md/replay';

export default class Ban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banned: false,
      willBan: false
    };
  }
  ban = () => {
    //this.setState({ willBan: true });
    const modalContent = (
      <div className={styles.confirmText}>
        {this.props.message.name} will be banned for this discussion
      </div>
    );
    this.props.openModal(
      modalContent,
      success => {
        console.log(success);
      });
  };
  handleClose = () => {
    this.setState({ willBan: false });
  };
  handleConfirm = () => {
    this.props.onBan(this.props.message.id, () => {
      this.setState({
        banned: true
      });
      this.setState({ willBan: false });
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
  openModal: PropTypes.func
};