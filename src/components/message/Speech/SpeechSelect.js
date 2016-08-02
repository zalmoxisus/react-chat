import React, { Component, PropTypes } from 'react';
import MdCheck from 'react-icons/lib/md/check';
import styles from '../../../chat.scss';

export default class SpeechSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.options = window.speechSynthesis.getVoices()
      .filter(voice => voice.lang.indexOf(this.props.chatStore.lang) > -1)
      .map(voice => (
        <option key={voice.name} value={voice.name}>{voice.name.replace('Google', '')}</option>
      ));
  }
  handleSelect = (e) => {
    this.setState({ value: e.target.value });
  };
  handleCheck = () => {
    this.props.onChange(this.state.value);
  };
  render() {
    return (
      <div style={{ whiteSpace: 'nowrap' }}>
        <select value={this.state.value} onChange={this.handleSelect}>
          {this.options}
        </select>
        <MdCheck
          className={styles.btn}
          onClick={this.handleCheck}
        />
      </div>
    );
  }
}

SpeechSelect.propTypes = {
  chatStore: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
