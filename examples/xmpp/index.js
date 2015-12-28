import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';

class Container extends Component {
  static propTypes = {
    messages: PropTypes.array,
    me: PropTypes.object
  };
  static defaultProps = {
    messages: []
  };

  state = {
    messages: this.props.messages,

    add: function(message) {
      this.messages.push(message);
    }
  };

  handleReceiveMessage = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: this.props.me.name,
      avatar: this.props.me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: 1
    };

    this.state.add(message);
    this.setState(this.state);
    success();
  };

  render() {
    return (
      <Chat me={this.props.me} messages={this.props.messages} onMessage={this.handleReceiveMessage} />
    );
  }
}

ReactDOM.render(<Container
  me={{ id: 2, name: 'Leo', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg' }}
  />, document.getElementById('root'));
