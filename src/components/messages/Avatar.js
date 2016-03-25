import React, { Component, PropTypes } from 'react';
import styles from '../../chat.scss';
import Infotip from '../../utils/Infotip';

export default class Avatar extends Component {
  render() {
    const { src, name, ...rest } = this.props;
    return (
      <div {...rest}>
        <div className={styles.avatar}>
          {
            src ?
              null :
              <div className={styles.txt}>{name[0]}</div>
          }
        </div>
        {
          src ?
            <Infotip src={src}>
              <div className={styles.avtrTooltip}>
                <div className={styles.avtrName}>{name}</div>
                {
                  src ? <img src={src} /> : null
                }
              </div>
            </Infotip> : null
        }
      </div>
    );
  }
}

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string
};