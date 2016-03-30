import React, { Component, PropTypes } from 'react';
import styles from '../../contactlist.scss';
import MdInfo from 'react-icons/lib/md/info';
import MdMessage from 'react-icons/lib/md/message';
import MdVideocam from 'react-icons/lib/md/videocam';

export default class MenuLeft extends Component {
  showInfo = () => {
    this.props.onInfo(this.props.contactItem);
  };
  sendMessage = () => {
    this.props.onMessage(this.props.contactItem);
  };
  videoCall = () => {
    this.props.onCall(this.props.contactItem);
  };

  render() {
    return (
      <div className={styles.optionsLeft}>
        <MdInfo onClick={this.showInfo} />
        <MdMessage onClick={this.sendMessage} />
        <MdVideocam onClick={this.videoCall} />
      </div>
    );
  }
}

MenuLeft.propTypes = {
  contactItem: PropTypes.number,
  onInfo: PropTypes.func,
  onMessage: PropTypes.func,
  onCall: PropTypes.func
};