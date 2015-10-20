import React, { Component, PropTypes } from 'react';
import Avatar from './Avatar';
import Radium from 'radium';
import styles from './Styles';

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
        <div style={[styles.arrow, styles.arrowLeft]}></div>
    );
  } 
}

@Radium
class MsgBox extends Component {
  render() {
    return(
        <div key={this.props.msg} style={[styles.msg, styles.u_msg]}>
          <div style={{fontWeight: '600', fontSize: '16px'}}> {this.props.msg} </div>
          <div style={{fontWeight: '100', fontSize: '10px', color: '#a4a4a4'}}>
            <div style={{float: 'left'}}> {this.props.name} </div>
            <div className='icon-access-time' style={{float: 'left', margin: '2px 2px 0 3px', opacity: 0.7}}></div>
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
            <Avatar style={styles.avatar}
                    src={message.avatar}
                    name={message.name}
                />
            <Arrow />
            <MsgBox msg={ message.msg} name={message.name} time={message.time} />
          </div>
        })
      }
      </div>
    );
  }

}
