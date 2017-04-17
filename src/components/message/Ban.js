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
  handleConfirm = (val) => {
    this.props.ban(this.props.message._id, () => {
      this.setState({
        banned: true
      });
    });
  };
  ban = () => {
    const modalContent = {
      type: 'ban',
      title: this.props.message.user.name + ' will be banned for this discussion',
      func: this.handleConfirm
    };
    this.props.handleModal(modalContent, true);
  };

  render() {
    const { isMine, onRestore } = this.props;
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
      {isMine ?
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
  message: PropTypes.object,
  isMine: PropTypes.bool,
  onRestore: PropTypes.func,
  deleted: PropTypes.bool,
  handleModal: PropTypes.func,
  ban: PropTypes.func
};
