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
  state = {messages: this.props.messages};

  handleReceiveMessage = (msg, success) => {
    const message = {
      id: Math.random(),
      name: this.props.me.name,
      avatar: this.props.me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: 1
    };

    this.setState({messages: this.state.messages.concat(message)});
    success();
  };

  render() {
    return (
      <Chat me={this.props.me} messages={this.state.messages} onMessage={this.handleReceiveMessage} />
    );
  }
}

ReactDOM.render(<Container
  me={{ id: 2, name: 'Leo', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg' }}
  messages={[
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {id: 2, name: 'Marry', avatar: '', msg: 'Welcome, John!', time: 1444428192, sender: 2},
    {
      id: 3,
      name: 'John',
      avatar: '',
      msg: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 4,
      name: 'Marry',
      avatar: '',
      msg: 'Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John!',
      time: 1444428192,
      sender: 2
    },
    {id: 5, name: 'John', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg', msg: 'Hello, Marry!', time: 1444428192, sender: 1},
    {id: 6, name: 'Marry', avatar: '', msg: 'Welcome, John!', time: 1444428192, sender: 2},
    {
      id: 7,
      name: 'John',
      avatar: '',
      msg: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 8,
      name: 'Marry',
      avatar: '',
      msg: 'Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John!',
      time: 1444428192,
      sender: 2
    }
  ]} />, document.getElementById('root'));
