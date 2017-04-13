import { observable, action, computed } from 'mobx';
import testMessages from '../testMessages';

export default class Store {
  @observable user = {
    _id: '2',
    name: 'Marry'
  };
  @observable messages = testMessages;
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable modal = undefined;

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

  @action onInputTextChanged = value => {
    console.log('input text changed', value);
  };

  @action onTranslate(txt, to, cb) {
    // Add here your translation method
    cb(txt);
  }

  @action handleModal = (modalContent, closed) => {
    if (closed) this.modal = modalContent;
    else this.modal = undefined;
  };

  @action submitModal = (val) => {
    const modal = this.modal;
    if (modal['msg']) modal.func(val, modal['msg']);
    else modal.func(val);
    setTimeout(() => { this.handleModal(); }, 1);
  };
}
