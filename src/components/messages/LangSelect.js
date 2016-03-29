import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdCheck from 'react-icons/lib/md/check';

export default class LangSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.lang };
    this.options = this.props.translateLanguages
      .map(lang => (
        <option key={lang.l} value={lang.c}>{lang.l}</option>
      ));
  }
  handleSelect = (e) => {
    this.setState({ value: e.target.value });
  };
  handleCheck = () => {
    this.props.onChange(this.state.value, this.props.msg);
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

LangSelect.propTypes = {
  translateLanguages: PropTypes.array,
  lang: PropTypes.string,
  msg: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
