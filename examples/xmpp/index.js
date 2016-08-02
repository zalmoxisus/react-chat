import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';
import { useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import style from './style.scss';
import ChatStore from './store/ChatStore';
import ChatViewStore from './store/ChatViewStore';

useStrict(true);

const chatStore = new ChatStore();
const chatViewStore = new ChatViewStore();

const hash = window.location.hash ? window.location.hash.substr(1) : '1';
const data = {
  bosh: 'https://xmpp.jix.im/http-bind',
  name: 'react' + hash,
  jid: `react${hash}@jix.im`,
  password: 'react1react1react1',
  muc: 'reactchat@muc.jix.im'
};
const me = { id: data.name, name: data.name };
let conn;

@observer
class Container extends Component {
  static propTypes = {
    messages: PropTypes.array,
    me: PropTypes.object
  };
  static defaultProps = {
    messages: []
  };

  constructor(props) {
    super(props);

    conn.send($pres({ from: data.jid, to: data.muc + '/' + data.name }));
    /*
     const iq = $iq({ to: data.muc, type: 'set' }).c("query", {
     xmlns: Strophe.NS.MUC_OWNER
     });
     iq.c('x', { xmlns: "jabber:x:data", type: "submit" });
     iq.c('field', { 'var': 'FORM_TYPE' }).c('value').t('http://jabber.org/protocol/muc#roomconfig').up().up();
     iq.c('field', { 'var': 'muc#roomconfig_persistentroom' }).c('value').t(true).up().up();
     conn.sendIQ(iq.tree(), function() {
      console.log('success'); }, function(err) { console.log('error', err);
     });
     */
    conn.addHandler(this.onMessage, null, 'message', null, null, null);
    conn.addHandler(this.onMessage, null, 'iq', 'set', null, null);
    console.log(chatStore.me);
    chatStore.setMe(data.name, data.name);
  }

  state = {
    messages: this.props.messages,

    add(message) {
      this.messages.push(message);
    }
  };

  onMessage = (stanza) => {
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

    this.state.add(message);
    this.setState(this.state);
    return true;
  };

  sendMessage = (message, to) => {
    const reply = $msg({ to, type: 'groupchat' })
      .cnode(Strophe.xmlElement('body', message)).up();
    conn.send(reply);
    console.log(`I sent to ${to}: ${message}`);
  };

  handleSendMessage = (msg, success) => {
    this.sendMessage(msg.txt, data.muc);
    success();
  };

  render() {
    return (
      <Provider chatStore={chatStore} chatViewStore={chatViewStore}>
        <Chat userId={this.props.me.id} me={this.props.me} messages={this.props.messages} onSend={this.handleSendMessage} />
      </Provider>
    );
  }
}

function init() {
  ReactDOM.render(<Container me={me} />, document.getElementById('root'));
}

conn = new Strophe.Connection(data.bosh);
conn.connect(data.jid, data.password, function (status) {
  console.log('status', status);
  if (status === Strophe.Status.CONNECTED) {
    console.log('connected');
    init();
  } else if (status === Strophe.Status.DISCONNECTED) {
    console.log('disconnected');
  }
});
