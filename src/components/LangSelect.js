import React, { Component, PropTypes } from 'react';

export default class LangSelect extends Component {
  static propTypes = {
    translateLanguages: PropTypes.array
  };
  componentDidMount() {
    for (let i = 0, l = this.props.translateLanguages.length; i < l; i++) {
      let option = this.props.translateLanguages[i];
      this.languageSelect.options.add(new Option(option.l, option.c));
      if (option.selected) this.languageSelect.value = this.languageSelect.options[i].value;
    }
  }
  render() {
    return (
      <select ref={(ref) => this.languageSelect = ref}/>
    );
  }
}