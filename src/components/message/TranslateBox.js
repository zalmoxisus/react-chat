import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import MdClose from 'react-icons/lib/md/close';
import MdTranslate from 'react-icons/lib/md/translate';

export default class TranslateBox extends Component {
  removeBox = (trLang) => {
    this.props.onDelete(trLang);
  };
  render() {
    return (
      <div>
        {
          this.props.trLangs.map(trLang =>
            <div key={trLang.id} className={styles.trBox}>
              <span onClick={this.removeBox.bind(this, trLang.id)} className={styles.trSpan}>
                <span>
                  <MdTranslate />
                  <MdClose />
                </span>
                <span>{trLang.lang.toUpperCase()}</span>
              </span>
              <span className={styles.trText}>{trLang.txt}</span>
            </div>
          )
        }
      </div>
    );
  }
}

TranslateBox.propTypes = {
  trLangs: PropTypes.array,
  onDelete: PropTypes.func
};
