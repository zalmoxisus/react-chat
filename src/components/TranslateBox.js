import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import MdClose from 'react-icons/lib/md/close';
import MdTranslate from 'react-icons/lib/md/translate';

export default class TranslateBox extends Component {
  static propTypes = {
    lang: PropTypes.string
  };
  render() {
    return (
      <div className={styles.trBox}>
        <span className={styles.trText}>Hello, Marry!</span>
                <span className={styles.trSpan}>
                  <span>
                    <MdTranslate/>
                    <MdClose/>
                  </span>
                  <span>{this.props.lang}</span>
                </span>
      </div>
    );
  }
}