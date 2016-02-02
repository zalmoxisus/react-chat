import React, { Component, PropTypes } from 'react';

export default class ChatInput extends Component {
  static propTypes = {
    voices: PropTypes.array
  };
  componentDidMount() {
    for (let i = 0, l = this.props.voices.length; i < l; i++) {
      let option = this.props.voices[i];
      this.speechSelect.options.add(new Option(option.name, option.name));
    }
  }
  render() {
    return (
      <select ref={(ref) => this.speechSelect = ref}/>
    );
  }
}