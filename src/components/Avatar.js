import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default ({ src, name }) => (
  <div className={styles.avatar}>
    { src ? <img className={styles.img} src={src}/> : <div className={styles.txt}>{name[0]}</div> }
  </div>
);
