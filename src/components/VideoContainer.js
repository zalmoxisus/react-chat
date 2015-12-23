import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default class ChatInput extends Component {
  static propTypes = {
    src: PropTypes.string
  };
  componentDidMount() {
    this.contentMsg.innerHTML = this.props.src;
  }
  componentDidUpdate() {
    this.contentMsg.innerHTML = this.props.src;
    return true;
  }
  render() {
    return (
      <span ref={(ref) => this.contentMsg = ref} style={{marginTop: '5px'}}>
      </span>
    );
  }
}
