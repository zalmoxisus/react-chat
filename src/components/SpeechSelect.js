import React, { Component, PropTypes } from 'react';

export default class SpeechSelect extends Component {
  static propTypes = {
    lang: PropTypes.string
  };
  componentWillMount() {
    this.options = window.speechSynthesis.getVoices()
      .filter(voice => voice.lang.indexOf(this.props.lang) > -1)
      .map(voice => (
        <option key={voice.name} value={voice.name}>{voice.name.replace('Google', '')}</option>
      ));
  }
  render() {
    return (
      <select defaultValue={this.props.value}>
        {this.options}
      </select>
    );
  }
}
