import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default class EditName extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChangeName: PropTypes.func,
    editName: PropTypes.func
  };
  componentDidUpdate = () => {
    this.nameInput.value = this.props.name;
  };
  handleName = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      const name = e.target.value;
      const that = this;
      this.props.onChangeName({ name }, function success() {
        that.props.editName(name);
      });
    }
  };
  render() {
    return (
      <input
        ref={(ref) => this.nameInput = ref}
        defaultValue={this.props.name}
        onKeyPress={this.handleName}
      />
    );
  }
}
