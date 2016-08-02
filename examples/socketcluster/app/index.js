import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import socketCluster from 'socketcluster-client';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import './style.scss';
import ChatStore from './store/ChatStore';
import ChatViewStore from './store/ChatViewStore';

useStrict(true);

const chatStore = new ChatStore();
const chatViewStore = new ChatViewStore();

const randomId = Math.floor((Math.random() * 100)).toString();
const me = {
  id: randomId,
  name: `User ${randomId}`,
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

  componentDidMount() {
    this.socket = socketCluster.connect();

    this.socket.on('error', (err) => {
      console.error('Socket error - ' + err);
    });
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    const channel = this.socket.subscribe('some-chat-room');
    channel.on('subscribeFail', (err) => {
      console.log('Failed to subscribe to muc channel due to error: ' + err);
    });
    channel.watch(message => {
      const messages = this.state.messages;
      messages.push(message);
      this.setState({ messages });
    });
  }

  handleSend = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: me.id
    };

    this.socket.emit('some-chat-room', message);
    success();
  };


  render() {
    return (
      <Provider chatStore={chatStore} chatViewStore={chatViewStore}>
        <Chat
          me={me}
          messages={this.state.messages}
          onSend={this.handleSend}
          withPhoto
        />
      </Provider>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
