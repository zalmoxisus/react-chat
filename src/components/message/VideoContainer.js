import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import emojify from '../../utils/emojify';

export default class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiSrc: ''
    };
    this.exp = /<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>|<a[^>]*>([^<]+)(<\/a>)?/ig;
  }

  componentWillMount() {
    this.setState({
      emojiSrc: this.props.src.replace(this.exp, '')
    });
  }
  componentDidMount() {
    this.contentMsg.innerHTML = this.props.src.match(this.exp);
  }
  componentWillReceiveProps() {
    this.setState({
      emojiSrc: this.props.src.replace(this.exp, '')
    });
  }
  componentDidUpdate() {
    this.contentMsg.innerHTML = this.props.src.match(this.exp);
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
