import React, { Component, PropTypes } from 'react';
import Triangle from './Triangle';

export default class TooltipArrow extends Component {
  static propTypes = {
    position: React.PropTypes.string,
    visibility: React.PropTypes.string,
    left: React.PropTypes.number,
    top: React.PropTypes.number,
    color: React.PropTypes.string.isRequired,  // a css color
    border: React.PropTypes.string.isRequired,  // a css color
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    horizontalDirection: React.PropTypes.oneOf(
      ['left', 'right']
    ).isRequired,
    verticalDirection: React.PropTypes.oneOf(
      ['top', 'bottom']
    ).isRequired
  };
  static defaultProps = {
    position: 'relative',
    visibility: 'visible',
    left: 0,
    top: 0
  };

  render() {
    //var isRight = (this.props.horizontalDirection === "right");
    let isTop = (this.props.verticalDirection === 'top');

    let frontTopOffset = isTop ? 0 : 1;
    let borderTopOffset = isTop ? 0 : -1;
    return (
      <div style={{
        display: 'block',
        position: this.props.position,
        visibility: this.props.visibility,
        left: this.props.left,
        top: this.props['top'],
        width: this.props.width + 2,
        height: this.props.height + 1,
        marginTop: -5,
        marginBottom: -2,
        zIndex: 100
      }}
      >
        {/* The background triangle used to create the effect of a
         border around the foreground triangle*/}
        <Triangle
          horizontalDirection={this.props.horizontalDirection}
          verticalDirection={this.props.verticalDirection}
          color={this.props.border}
          left={0}
          top={borderTopOffset}
          width={this.props.width + 2}  // one extra for the diagonal
          height={this.props.height + 2}
        />
        {/* The foreground triangle covers all but the left/right edges
         of the background triangle */}
        <Triangle
          horizontalDirection={this.props.horizontalDirection}
          verticalDirection={this.props.verticalDirection}
          color={this.props.color}
          left={1}
          top={frontTopOffset}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}