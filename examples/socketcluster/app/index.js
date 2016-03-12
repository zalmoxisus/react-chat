import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
const me = {
  id: '1',
  name: 'Leo',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
};

class Container extends Component {
  static propTypes = {
    messages: PropTypes.array,
    me: PropTypes.object
  };
  static defaultProps = {
    messages: []
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  handleSend = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    console.log(this.state.messages);
    success();
  };


  render() {
    return (
      <Chat
        me={me}
        messages={this.state.messages}
        onSend={this.handleSend}
      />
    );
  }
}

ReactDOM.render(<Container/>, document.getElementById('root'));
