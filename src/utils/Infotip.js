import React, { Component, PropTypes } from 'react';
import styles from './infotip.scss';

export default class Infotip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  handleMouseEnter = () => {
    this.setState({ hover: true });
  };
  handleMouseLeave = () => {
    this.setState({ hover: false });
  };
  render() {
    return (<div className={styles.infoTip}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
    >
      <img width={25}
        height={25}
        className={styles.img}
        src={this.props.src}
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
  src: PropTypes.string,
  children: React.PropTypes.element.isRequired
};