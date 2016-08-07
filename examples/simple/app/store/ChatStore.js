import { ChatStore as Store } from 'react-chat';

export default class ChatStore extends Store {
  send(msg, me, success) {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    super.send(message, success);
  }
}
