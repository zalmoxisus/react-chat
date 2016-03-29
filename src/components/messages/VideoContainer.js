import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import emojify from '../../utils/emojify';

export default class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiSrc: ''
    };
  }

  componentWillMount() {
    this.setState({
      emojiSrc: this.props.src.replace(/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/ig, '')
    });
  }
  componentDidMount() {
    this.contentMsg.innerHTML = this.props.src.match(/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/ig);
  }
  componentWillReceiveProps() {
    this.setState({
      emojiSrc: this.props.src.replace(/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/ig, '')
    });
  }
  componentDidUpdate() {
    this.contentMsg.innerHTML = this.props.src.match(/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/ig);
    return true;
  }
  mapRef = (node) => {
    this.contentMsg = node;
  };
  render() {
    return (
      <span>
        <span>
          { emojify(this.state.emojiSrc) }
        </span>
        <span ref={this.mapRef} className={styles.videoContainer}>
        </span>
      </span>
    );
  }
}

VideoContainer.propTypes = {
  src: PropTypes.string
};
