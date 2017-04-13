import { observable, action } from 'mobx';
import testMessages from '../testMessages';

export default class Store {
  @observable user = {
    _id: '2',
    name: 'Marry'
  };
  @observable messages = testMessages;

  @action onSend = message => {
    console.log('new message', message);
    const msg = {
      _id: Date.now() / 1000 | 0,
      createdAt: new Date(),
      user: this.user,
      text: message.text
    };
    this.messages.push(msg);
  };
}
