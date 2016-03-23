import React, { Component } from 'react';

function isDefined(val) { return val !== null; }
export default class ToggleDisplay extends Component {
  shouldHide = () => {
    let shouldHide;
    if (isDefined(this.props.show)) {
      shouldHide = !this.props.show;
    } else if (isDefined(this.props.hide)) {
      shouldHide = this.props.hide;
    } else {
      shouldHide = false;
    }
    return shouldHide;
  };
  render() {
    let style = {};
    if (this.shouldHide()) {
      style.display = 'none';
    }
    return (
      <span style={style} {...this.props} />
    );
  }
}

ToggleDisplay.propTypes = {
  hide: React.PropTypes.bool,
  show: React.PropTypes.bool
};