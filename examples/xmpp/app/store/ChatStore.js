import remotedev from 'mobx-remotedev';
import { observable, action } from 'mobx';
import { ChatStore as Store } from 'react-chat';

class ChatStore extends Store{
  @observable data = {};
  @observable conn = {};

  constructor(state) {
    super();
    if (state) this.importState(state);

    this.conn.send($pres({ from: this.data.jid, to: this.data.muc + '/' + this.data.name }));
    this.conn.addHandler(this.onMessage, null, 'message', null, null, null);
    this.conn.addHandler(this.onMessage, null, 'iq', 'set', null, null);
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  onMessage(stanza) {
    console.log('received', stanza);
    const id = Strophe.getResourceFromJid(stanza.attributes.from.value);
    const msg = stanza.querySelectorAll('body')[0].innerHTML;
    const delay = stanza.querySelectorAll('delay')[0];
    const time = (delay ?
        (new Date(delay.attributes.stamp.value)).getTime() :
        Date.now()) / 1000 | 0;
    const message = {
      id: id + time,
      name: id,
      msg,
      time,
      sender: id
    };

    return true;
  };

  @action sendMessage = (message, to) => {
    const reply = $msg({ to, type: 'groupchat' })
      .cnode(Strophe.xmlElement('body', message)).up();
    this.conn.send(reply);
    console.log(`I sent to ${to}: ${message}`);
  };

  send(msg, me, success) {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: me.name,
      avatar: me.avatar,
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };

    this.sendMessage(msg.txt, this.data.muc);

    super.addMessage(message);
    success();
  };
}

export default remotedev(ChatStore);
