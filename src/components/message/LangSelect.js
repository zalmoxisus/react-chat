import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdCheck from 'react-icons/lib/md/check';
import { inject } from 'mobx-react';

@inject('chatViewStore')
export default class LangSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.chatViewStore.lang };
    this.options = this.props.chatViewStore.translateLanguages
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
      <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>
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
  chatViewStore: PropTypes.object,
  msg: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
