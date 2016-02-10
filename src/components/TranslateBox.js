import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import MdClose from 'react-icons/lib/md/close';
import MdTranslate from 'react-icons/lib/md/translate';

export default class TranslateBox extends Component {
  static propTypes = {
    trLangs: PropTypes.array,
    onDelete: PropTypes.func
  };
  removeBox = (trLang, e) => {
    this.props.onDelete(trLang);
  };
  render() {
    return (
      <div>
        {
          this.props.trLangs.map(trLang => {
            return (
              <div key={trLang.id} className={styles.trBox}>
                <span onClick={this.removeBox.bind(this, trLang.id)} className={styles.trSpan}>
                  <span>
                    <MdTranslate/>
                    <MdClose/>
                  </span>
                  <span>{trLang.lang.toUpperCase()}</span>
                </span>
                <span className={styles.trText}>{trLang.txt}</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}