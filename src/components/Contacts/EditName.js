import React, { Component, PropTypes } from 'react';
import styles from '../../contactlist.scss';

export default class EditName extends Component {
  render() {
    const { name, onChangeName } = this.props;
    return (
      <div className={styles.editContainer}>
        <input autoFocus
          onKeyDown={onChangeName}
          className={styles.editInput}
          maxLength="45"
          defaultValue={name}
        />
      </div>
    );
  }
}

EditName.propTypes = {
  name: PropTypes.string,
  onChangeName: PropTypes.func
};