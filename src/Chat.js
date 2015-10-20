import React, { Component, PropTypes } from 'react';
import Avatar from './Avatar';
import Radium from 'radium';
import styles from './Styles';

var owner = 2;

function getTimeStamp(msgTime) {
  var date = new Date(msgTime*1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  return (hours + ':' + minutes.substr(-2));
}

@Radium
class Arrow extends Component {
  render() {
    return(
        <div style={[styles.arrow, (owner === this.props.sender) ? styles.arrowRight : styles.arrowLeft]}></div>
    );
  }
}

@Radium
class MsgBox extends Component {
  render() {
    return(
        <div key={this.props.msg} style={[styles.msg, (owner === this.props.sender) ? styles.my_msg : styles.u_msg]}>
          <div style={styles.content_msg}> {this.props.msg} </div>
          <div style={styles.footer_msg}>
            <div style={{float: 'left'}}> {this.props.name} </div>
            <div className='icon-access-time' style={styles.timeIcon}></div>
            <div style={{float: 'left'}}> {getTimeStamp(this.props.time)} </div>
          </div>
        </div>
    );
  }
}

export default class Chat extends Component {
  static defaultProps = {
    messages: []
  };

  static propTypes = {
    messages: PropTypes.array
  };

  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div style={styles.base}>{
        this.props.messages.map( message => {
          return <div key={message.id} style={styles.msgBox}>
            {
              !(owner === message.sender) &&
              <Avatar style={styles.avatar}
                      src={message.avatar}
                      name={message.name}
                  />
            }
            <Arrow sender = {message.sender} />
            <MsgBox msg={ message.msg} name={message.name} time={message.time} sender={message.sender} />
          </div>
        })
      }
      </div>
    );
  }

}
