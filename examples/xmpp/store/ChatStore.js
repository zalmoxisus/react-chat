import { observable, action } from 'mobx';

export default class ChatStore {
  @observable me = {
    id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
  };
  @observable messages = [];
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable withPhoto = true;
  @observable toolTipPosition = 'right';
  @observable menuShow = false;
  @observable emoticonShow = false;
  @observable voicesArr = [];

  @action setMe = (id, name) => {
    this.me.id = id;
    this.me.name = name;
  };

  @action send = (msg, me, success) => {
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
  @action translate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };
  @action menu = (val) => {
    this.menuShow = val;
  };
  @action emoticon = (val) => {
    this.emoticonShow = val;
  };
}

