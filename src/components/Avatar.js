import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToolTip from 'react-portal-tooltip';

let position;
let style = {
  style: {
    padding: 0
  },
  arrowStyle: {
    borderColor: false
  }
};
export default class Avatar extends Component {
  static propTypes = {
    id: PropTypes.number,
    src: PropTypes.string,
    name: PropTypes.string
  };
  state = {
    isTooltipActive: false
  };
  showTooltip = (e) => {
    this.setState({ isTooltipActive: true });
    position = this.avtrLeft(e);
    if (e.currentTarget.offsetParent.offsetTop < 100) {
      style.style.marginTop = '85px';
      style.arrowStyle.marginTop = '-85px';
      style.arrowStyle.color = '#eee';
    } else {
      style.style.marginTop = 0;
      style.arrowStyle.marginTop = '-15px';
      style.arrowStyle.color = '#f5f5f5';
    }
  };
  avtrLeft = e => e.currentTarget.offsetParent.offsetParent.offsetLeft;
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
              position={ position > 170 ? 'left' : 'right' } arrow="center"
              parent={'#avtr' + id}
              style={style}
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