import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import emojify from '../utils/emojify';

export default class VideoContainer extends Component {
  static propTypes = {
    src: PropTypes.string
  };
  state = {
    emojiSrc: ''
  };

  componentWillMount() {
    this.setState({ emojiSrc: this.props.src.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '') });
  }
  componentDidMount() {
    this.contentMsg.innerHTML = this.props.src.match(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig);
  }
  componentWillReceiveProps() {
    this.setState({ emojiSrc: this.props.src.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '') });
  }
  componentDidUpdate() {
    this.contentMsg.innerHTML = this.props.src.match(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig);
    return true;
  }
  render() {
    return (
      <span>
        <span>
          { emojify(this.state.emojiSrc) }
        </span>
        <span ref={(ref) => this.contentMsg = ref} className={styles.videoContainer}>
        </span>
      </span>
    );
  }
}
