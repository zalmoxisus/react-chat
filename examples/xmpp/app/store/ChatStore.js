import remotedev from 'mobx-remotedev';
import { observable, action } from 'mobx';
import { ChatStore as Store } from 'react-chat';

class ChatStore extends Store{
  @observable me = {
    id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
  };

  constructor(state) {
    super();
    if (state) this.importState(state);
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action setMe = (id, name) => {
    this.me.id = id;
    this.me.name = name;
  };

  send(msg, me, success) {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: this.me.name,
      avatar: this.me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    super.addMessage(message);
    success();
  };
}

export default remotedev(ChatStore);
