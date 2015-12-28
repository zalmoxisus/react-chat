import React, { Component, PropTypes } from 'react';
import styles from '../Chat.css';
import Avatar from './Avatar';
import getTimeStamp from '../utils/getTimeStamp.js';
import emojify from '../utils/emojify';
import convertMedia from '../utils/convertMedia';
import VideoContainer from './VideoContainer';

function getMine(owner) {
  let mine = 2;
  return (mine === owner);
}

export default class ChatArea extends Component {
  static propTypes = {
    messages: PropTypes.array,
    updateName: PropTypes.func
  };

  componentDidMount() {
    setTimeout(this.updateScrollTop, 500);
  }

  componentDidUpdate = () => {
    this.updateScrollTop();
  };

  updateScrollTop = () => {
    let node = document.getElementById('container');
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  };

  updateName = (e) => {
    this.props.updateName(e.currentTarget.textContent + ', ');
  };

  isMedia = (msg) => {
    const media = convertMedia(msg, 150, true);
    if ((media.indexOf('<iframe') > -1) || (media.indexOf('<a href') > -1)) return media;
    return false;
  };

  render() {
    return (
      <div id="container" className={styles.container}>
        {
          this.props.messages.map( message => {
            return (<div key={message.id} className={styles.msgBox}>
                {
                  !getMine(message.sender) &&
                  <Avatar style={styles.avatar}
                          src={message.avatar}
                          name={message.name}
                    />
                }
                <div className={getMine(message.sender) ? styles.arrowRight : styles.arrowLeft}></div>
                <div key={message.msg} className={getMine(message.sender) ? styles.my_msg : styles.u_msg}>
                  <div className={styles.content_msg}> {this.isMedia(message.msg) ? <VideoContainer src={this.isMedia(message.msg)}/> : emojify(message.msg)} </div>
                  <div className={styles.footer_msg}>
                    {
                      !getMine(message.sender) &&
                      <div>
                        <div className={styles.msg_name} onClick={this.updateName}>
                          <span style={{float: 'left'}}>{message.name}</span>
                          <div className="icon-access-time"></div>
                        </div>
                      </div>
                    }
                    <div style={{float: 'left'}}> {getTimeStamp(message.time)} </div>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>
    );
  }
}
