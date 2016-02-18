import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToolTip from 'react-portal-tooltip';

export default class Avatar extends Component {
  static propTypes = {
    id: PropTypes.number,
    src: PropTypes.string,
    name: PropTypes.string
  };
  state = {
    isTooltipActive: false
  };
  showTooltip = () => {
    this.setState({ isTooltipActive: true });
  };
  hideTooltip = () => {
    this.setState({ isTooltipActive: false });
  };
  render() {
    const { id, src, name } = this.props;
    return (
      <div>
        <div
          id={'avtr' + id} className={styles.avatar}
          onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}
        >
          {
            src ?
              <img className={styles.img} src={src}/> :
              <div className={styles.txt}>{name[0]}</div>
          }
        </div>
        {
          src ?
            <ToolTip
              active={this.state.isTooltipActive}
              position={'right'} arrow="center"
              parent={'#avtr' + id}
            >
              <div className={styles.avtrTooltip}>
                <div className={styles.avtrName}>{name}</div>
                {
                  src ? <img src={src}/> : null
                }
              </div>
            </ToolTip> : null
        }
      </div>
    );
  }
}