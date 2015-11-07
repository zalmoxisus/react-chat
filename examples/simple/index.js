import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';

class Container extends Component {
  state = {messages: this.props.messages};
  static defaultProps = {
    messages : [
      {
        id: 1,
        name: 'John',
        avatar: 'https://pp.vk.me/c621720/v621720119/31ca4/ic-nhOiDogM.jpg',
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
      {id: 5, name: 'John', avatar: '', msg: 'Hello, Marry!', time: 1444428192, sender: 1},
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
    ],
    my : {
      id: 2,
      name: 'My',
      avatar: 'https://pp.vk.me/c621720/v621720119/31ca4/ic-nhOiDogM.jpg'
    }
  };

  static propTypes = {
    messages: PropTypes.array,
    my: PropTypes.object,
    addMessages: PropTypes.func
  };

  addMessages = (e) => {
    var input = e.target;
    var text = input.value;
    var message = {
      id: Math.random(),
      name: this.props.my.name,
      avatar: this.props.my.avatar,
      msg: text,
      time: Date.now() / 1000 | 0,
      sender: 1
    };

    this.setState({messages: this.state.messages.concat(message)});
    input.value = "";
  };

  render() {
    return (
      <Chat messages={this.state.messages} addMessages={this.addMessages} />
    );
  }

}

ReactDOM.render(<Container />, document.getElementById('root'));
