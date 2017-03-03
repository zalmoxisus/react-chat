import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';

export default class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className={styles.msgBox}>
        {message.text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object
};
