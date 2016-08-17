import { ChatStore as Store } from 'react-chat';
import socketCluster from 'socketcluster-client';
import { observable, action } from 'mobx';

class ChatStore extends Store {
  @observable socket;

  @action connect() {
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
      super.addMessage(message);
    });
  }

  send(msg, me, success) {

    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    this.socket.emit('some-chat-room', message);
    success();
  }
}

export default ChatStore;
