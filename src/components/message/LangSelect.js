import React, { Component, PropTypes } from 'react';
import MdCheck from 'react-icons/lib/md/check';
import { inject } from 'mobx-react';
import styles from '../../chat.scss';

@inject('chatStore')
export default class LangSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.chatStore.lang };
    this.options = this.props.chatStore.translateLanguages
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
      <div className={styles.flexBox}>
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
  chatStore: PropTypes.object,
  msg: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
