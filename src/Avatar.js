import React, { Component, PropTypes } from 'react';

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
      <div>{ this.props.name[0] }</div>
    );
  }

}
