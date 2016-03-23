import React, { Component, PropTypes } from 'react';
import styles from './infotip.scss';

export default class Infotip extends Component {
  state = {
    hover: false
  };
  handleMouseEnter = () => {
    this.setState({ hover: true });
  };
  handleMouseLeave = () => {
    this.setState({ hover: false });
  };
  render() {
    return (<div className={styles.infoTip}>
      <img width={25}
        height={25}
        className={styles.img}
        src={this.props.src}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
      <div className={styles.infoTipContainer}
        style={{ display: this.state.hover ? 'block' : 'none' }}
      >
        <div className={styles.infoTipTriangle} />
        <div className={styles.infoTipContentContainer}>
          {this.props.children}
        </div>
      </div>
    </div>);
  }
}

Infotip.propTypes = {
  src: PropTypes.string
};