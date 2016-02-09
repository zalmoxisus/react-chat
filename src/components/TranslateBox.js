import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import MdClose from 'react-icons/lib/md/close';
import MdTranslate from 'react-icons/lib/md/translate';

export default class TranslateBox extends Component {
  static propTypes = {
    trLangs: PropTypes.array
  };
  render() {
    return (
      <div>
        {
          this.props.trLangs.map(trLang => {
            return (
              <div key={trLang.id} className={styles.trBox}>
                <span className={styles.trText}>Hello</span>
                <span onClick={this.hideTranslate} className={styles.trSpan}>
                  <span>
                    <MdTranslate/>
                    <MdClose/>
                  </span>
                  <span>{trLang.lang}</span>
                </span>
              </div>
            );
          })
        }
      </div>
    );
  }
}