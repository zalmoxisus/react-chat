import React, { Component, PropTypes } from 'react';
import styles from '../chat.scss';
import ToolTip from 'react-portal-tooltip';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }
  handleMouseEnter = () => {
    this.setState({ showTooltip: true });
  };
  handleMouseLeave = () => {
    this.setState({ showTooltip: false });
  };
  render() {
    const { src, name, toolTipPosition, ...rest } = this.props;
    return (
      <div {...rest}>
        <div>
          {
            src ?
              <img src={src}
                className={styles.avatar}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                id={'a' + this.props.id}
              /> :
              <div className={styles.txt}>{name[0]}</div>
          }
        </div>
        {
          toolTipPosition &&
          <ToolTip
            active={this.state.showTooltip}
            position={toolTipPosition} arrow="top"
            parent={'#a' + this.props.id}
          >
            <div className={styles.avtrTooltip}>
              <div className={styles.avtrName}>{name}</div>
              {
                src ? <img src={src} /> : null
              }
            </div>
          </ToolTip>
        }
      </div>
    );
  }
}

Avatar.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  name: PropTypes.string,
  toolTipPosition: PropTypes.string
};