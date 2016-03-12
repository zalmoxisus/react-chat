import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default class EditName extends Component {
  static propTypes = {
    id: PropTypes.number,
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
      const id = this.props.id;
      this.props.onChangeName(id, name, () => {
        this.props.editName(name);
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
