import React, { Component } from 'react';
import TooltipArrow from './tooltipUtils/TooltipArrow';
let _ = require('underscore');

let zIndex = 10;

let VERTICAL_CORNERS = {
  top: {
    top: '-100%'
  },
  bottom: {
    top: 0
  }
};

let HORIZONTAL_CORNERS = {
  left: {
    targetLeft: 0
  },

  right: {
    targetLeft: '100%'
  }
};

let HORIZONTAL_ALIGNMNENTS = {
  left: {
    tooltipLeft: 0,
    arrowLeft: () => 0
  },
  right: {
    tooltipLeft: '-100%',
    arrowLeft: (arrowSize) => -arrowSize - 2
  }
};

export default class Tooltip extends Component {
  state = {
    height: null
  };
  componentWillReceiveProps() {
    // If the contents have changed, reset our measure of the height
    this.setState({ height: null });
  }

  componentDidUpdate() {
    this._updateHeight();
  }

  _updateHeight() {
    /*var height =
     ReactDOM.findDOMNode(this.refs.tooltipContainer).offsetHeight;
     if (height !== this.state.height) {
     this.setState({height});
     }*/
  }

  renderToolTipDiv(isTooltipAbove) {
    let settings = _.extend({},
      HORIZONTAL_CORNERS[this.props.horizontalPosition],
      HORIZONTAL_ALIGNMNENTS[this.props.horizontalAlign],
      VERTICAL_CORNERS[this.props.verticalPosition]
    );

    let arrowAbove;
    let arrowBelow;

    if (isTooltipAbove) {
      // We put an absolutely positioned arrow in the correct place
      arrowAbove = (<TooltipArrow
        verticalDirection="top"
        horizontalDirection={this.props.horizontalAlign}
        position="absolute"
        color="#eee"
        border={this.props.borderColor}
        left={settings.arrowLeft(this.props.arrowSize)}
        top={-this.props.arrowSize + 2}
        width={this.props.arrowSize}
        height={this.props.arrowSize}
        zIndex={zIndex}
      />);

      // And we use a visibility: hidden arrow below to shift up the
      // content by the correct amount
      arrowBelow = (<TooltipArrow
        verticalDirection="top"
        horizontalDirection={this.props.horizontalAlign}
        visibility="hidden"
        color="#eee"
        border={this.props.borderColor}
        left={settings.arrowLeft(this.props.arrowSize)}
        top={-1}
        width={this.props.arrowSize}
        height={this.props.arrowSize}
        zIndex={zIndex}
      />);
    } else {
      arrowAbove = (<TooltipArrow
        verticalDirection="bottom"
        horizontalDirection={this.props.horizontalAlign}
        color="#eee"
        border={this.props.borderColor}
        left={settings.arrowLeft(this.props.arrowSize)}
        top={-1}
        width={this.props.arrowSize}
        height={this.props.arrowSize}
        zIndex={zIndex}
      />);

      arrowBelow = null;
    }

    /* A positioned div below the input to be the parent for our
     tooltip */
    return (<div style={{
      position: 'relative',
      height: 0,
      display: this.props.show ? 'block' : 'none'
    }}
    >
      <div ref={(ref) => this.tooltipContainer = ref} className="tooltipContainer" style={{
        position: 'absolute',
        //he actual height with jquery.
        // This is used to posit height must start out undefined, not null, so that
        // we can measure tion the tooltip with top: -100%
        // when in verticalPosition: "top" mode
        height: this.state.height || undefined,
        left: settings.targetLeft
      }}
      >
        {arrowAbove}

        {/* The contents of the tooltip */}
        <div className={this.props.className}
          ref={(ref) => this.tooltipContent = ref}
          style={{
            position: 'relative',
            top: settings['top'],
            left: settings.tooltipLeft,
            border: '1px solid ' + this.props.borderColor,
            WebkitBoxShadow: '0 1px 3px ' +
                    this.props.borderColor,
            MozBoxShadow: '0 1px 3px ' +
                    this.props.borderColor,
            boxShadow: '0 1px 3px ' +
                    this.props.borderColor,
            zIndex: zIndex - 1
          }}
        >
          {_.rest(this.props.children)}
        </div>

        {arrowBelow}
      </div>
    </div>
  );
  }

  render() {
    let isTooltipAbove = this.props.verticalPosition === 'top';
    return (
      <span>
            {isTooltipAbove && this.renderToolTipDiv(isTooltipAbove)}

        {/* We wrap our input in a div so that we can put the tooltip in a
         div above/below it */}
        <div>
          {_.first(this.props.children)}
        </div>

        {!isTooltipAbove && this.renderToolTipDiv()}
      </span>
    );
  }
}

Tooltip.propTypes = {
  show: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string,
  arrowSize: React.PropTypes.number,
  borderColor: React.PropTypes.string,
  verticalPosition: React.PropTypes.oneOf(
    _.keys(VERTICAL_CORNERS)
  ),
  horizontalPosition: React.PropTypes.oneOf(
    _.keys(HORIZONTAL_CORNERS)
  ),
  horizontalAlign: React.PropTypes.oneOf(
    _.keys(HORIZONTAL_ALIGNMNENTS)
  ),
  children: React.PropTypes.arrayOf(
    React.PropTypes.element
  ).isRequired
};
Tooltip.defaultProps = {
  className: '',
  arrowSize: 10,
  borderColor: '#ccc',
  verticalPosition: 'bottom',
  horizontalPosition: 'left',
  horizontalAlign: 'left'
};