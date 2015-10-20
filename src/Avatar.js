import React, { Component, PropTypes } from 'react';

var styles = {
  avatar: {
    fontSize: '16px',
    float: 'left',
    width: '25px',
    height: '25px',
    border: '1px solid #000',
    marginRight: '7px',
    textAlign: 'center',
    paddingTop: '4px'
  }
};
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
      <div style={styles.avatar}>{ this.props.name[0] }</div>
    );
  }

}
