import React, { Component, PropTypes } from 'react';
import styles from './Styles';

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
      <div style={styles.avatar}>
        { this.props.src ? <img  style={styles.img} src={this.props.src} /> : <div style={styles.txt}>{this.props.name[0]}</div> }
      </div>
    );
  }

}
