import React, { Component, PropTypes } from 'react';

export default class Triangle extends Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    horizontalDirection: React.PropTypes.oneOf(
      ['left', 'right']
    ).isRequired,
    verticalDirection: React.PropTypes.oneOf(
      ['top', 'bottom']
    ).isRequired
  };

  render() {
    let borderLeft;
    let borderRight;
    let borderTop;
    let borderBottom;

    let hBorder = `${this.props.width}px solid transparent`;
    if (this.props.horizontalDirection === 'right') {
      borderLeft = hBorder;
    } else {
      borderRight = hBorder;
    }

    let vBorder = `${this.props.height}px solid ${this.props.color}`;
    if (this.props.verticalDirection === 'top') {
      borderTop = vBorder;
    } else {
      borderBottom = vBorder;
    }
    return (
      <div style={{
        display: 'block',
        height: 0,
        width: 0,
        position: 'absolute',
        left: this.props.left,
        top: this.props['top'],
        borderLeft,
        borderRight,
        borderTop,
        borderBottom
      }}
      ></div>
    );
  }
}