import { observable, action } from 'mobx';

export default class ChatStore {
  @observable messages = [];
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable withPhoto = true;
  @observable toolTipPosition = 'right';
  @observable translateLanguages = [];
  @observable menuShow = false;
  @observable emoticonShow = false;
  @observable voicesArr = [];

  constructor(state) {
    if (state) this.importState(state);
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action send = (msg, me, success) => {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    this.messages.push(message);
    success();
  };

  @action remove = (message, success) => {
    // Add here delete method
    success();
  };

  @action translate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };
  @action restore = (message, success) => {
    // Add here restore method
    success();
  };
  @action ban = (id, success) => {
    // Add here ban method
    success();
  };
  @action menu = (val) => {
    this.menuShow = val;
  };
  @action emoticon = (val) => {
    this.emoticonShow = val;
  };
  @action addVoice = (voice) => {
    this.voicesArr.push(voice);
  };
}
