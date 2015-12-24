import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import ToggleDisplay from '../utils/ToggleDisplay';
import convertMedia from '../utils/convertMedia';

export default class UserMenu extends Component {
  static propTypes = {
    menuShow: PropTypes.bool,
    onMessage: PropTypes.func
  };
  changeVideoInp = (e) => {
    let media = convertMedia(e.target.value, 150, true);
    let videoContainer = this.videoInpContainer;
    let mediaContainer = document.createElement('span');

    mediaContainer.innerHTML = media;
    if (videoContainer.children.length === 2) videoContainer.appendChild(mediaContainer);
    else videoContainer.replaceChild(mediaContainer, videoContainer.children[2]);


    if (e.nativeEvent.keyCode === 13) {
      const input = e.target;
      const txt = e.target.value;
      if (txt === '') return;
      const that = this;
      this.props.onMessage({ txt: txt }, function success() {
        input.value = '';
        that.submenuShow = false;
        mediaContainer.innerHTML = '';
      });
    }
  };
  handleClick = (opt, e) => {
    switch (opt) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        this.submenuShow = true;
        const that = this;
        setTimeout(function() {
          that.videoInp.focus();
        }, 0);
        break;
      }
      default:
    }
  };
  handleClose = (e) => {
    this.submenuShow = false;
  };

  render() {
    return (<div className={styles.userContainer}>
      <ToggleDisplay show={this.props.menuShow}>
        <ul className={styles.usermenu}>
          <li onClick={this.handleClick.bind(this, 0)}>
            <span className="icon-mic"></span><a href="#">Dictate text</a>
          </li>
          <li onClick={this.handleClick.bind(this, 1)}>
            <span className="icon-insert-comment"></span><a href="#">Translate a phrase</a>
          </li>
          <li onClick={this.handleClick.bind(this, 2)}>
            <span className="icon-ondemand-video"></span><a href="#">Insert video</a>
          </li>
        </ul>
      </ToggleDisplay>
        <ToggleDisplay show={this.submenuShow}>
          <div ref={(ref) => this.videoInpContainer = ref} className={styles.videoInpContainer}>
            <input ref={(ref) => this.videoInp = ref} placeholder="Video url (youtube, vimeo)" onKeyUp={this.changeVideoInp}/>
            <div style={{position: 'fixed', left: 0, bottom: '23px', height: '30px' }} onClick={this.handleClose}>
              <p className="icon-clear" ref={(ref) => this.usermsg = ref}></p>
            </div>
          </div>
        </ToggleDisplay>
      </div>
    );
  }
}
