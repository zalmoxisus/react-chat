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
  @observable voices = [];

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

  @action ban = (id, success) => {
    // Add here ban method
    console.log('ban user : ' + id);
    success();
  };

  @action manageMessage = (id, removeMsg) => {
    this.messages.forEach((message, i) => {
      if (message._id === id) {
        const updateItem = message;
        updateItem.removed = removeMsg;
        this.messages.splice(i, 1, updateItem);
      }
    });
  };

  @action getVoices = () => {
    this.voices = window.speechSynthesis.getVoices()
      .filter(voice => voice.lang.indexOf(this.lang) > -1);
  }
}
