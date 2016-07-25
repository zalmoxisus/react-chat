import { observable, action } from 'mobx';
import testMessages from '../testMessages';

export default class ChatStore {
  @observable me = {
    id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
  };
  @observable messages = testMessages;
  @action remove;

  @action send = (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: this.me.name,
      avatar: this.me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    this.messages.push(message);
    success();
  };
}

