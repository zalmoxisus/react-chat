import React, { Component, PropTypes } from 'react';

export default class SpeechSelect extends Component {
  static propTypes = {
    voices: PropTypes.array,
    lang: PropTypes.string
  };
  componentDidMount() {
    let voicesByLang = [];
    for (let i = 0, l = this.props.voices.length; i < l; i++) {
      let option = this.props.voices[i];
      if (option.lang.indexOf(this.props.lang) > -1) voicesByLang.push(option);
    }
    for (let i = 0, l = voicesByLang.length; i < l; i++) {
      let option = voicesByLang[i];
      this.speechSelect.options.add(new Option(option.name, option.name));
    }
  }
  render() {
    return (
      <select ref={(ref) => this.speechSelect = ref}/>
    );
  }
}