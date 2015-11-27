import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';

export default () => (
  <ul className={styles.usermenu}>
    <li>
      <span className="icon-mic"></span><a href="#">Dictate text</a>
    </li>
    <li>
      <span className="icon-insert-comment"></span><a href="#">Translate a phrase</a>
    </li>
    <li>
      <span className="icon-ondemand-video"></span><a href="#">Insert video</a>
    </li>
  </ul>
);
