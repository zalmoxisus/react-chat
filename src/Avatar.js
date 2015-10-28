import React, { Component, PropTypes } from 'react';
import styles from './Chat.css';

export default class Avatar extends Component {
  static defaultProps = {
    src: '',
    name: ''
  };

  static propTypes = {
    src: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    return (
      <div className={styles.avatar}>
        { this.props.src ? <img  className={styles.img} src={this.props.src} /> : <div className={styles.txt}>{this.props.name[0]}</div> }
      </div>
    );
  }

}
