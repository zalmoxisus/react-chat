import { createFactory, arrayOf, mapOf } from 'mobx-state-tree';
import { action } from 'mobx';
import socketCluster from 'socketcluster-client';

let socket;

export const Message = createFactory({
  id: '',
  name: '',
  avatar: '',
  msg: '',
  time: '',
  sender: 0,
  channelID: 0
});

export const Languages = createFactory({
  c: '',
  l: ''
});

export const Modal = createFactory({
  type: '',
  title: '',
  list: arrayOf(),
  msg: '',
  func: action(function (val, msg) {
  })
});

const Store = createFactory({
  // App
  me: mapOf(),
  modal: mapOf(Modal),

  toolTipPosition: (process.env.ISMOBILE) ? undefined : 'right',

  // Chat
  messages: arrayOf(Message),
  translateLanguages: arrayOf(Languages),

  connect: action(function () {
    socket = socketCluster.connect();

    socket.on('error', (err) => {
      console.error('Socket error - ' + err);
    });
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    const channel = socket.subscribe('some-chat-room');
    channel.on('subscribeFail', (err) => {
      console.log('Failed to subscribe to muc channel due to error: ' + err);
    });
    channel.watch(message => {
      this.addMessage(message);
    });
  }),

  // App
  getUserdata: action(function () {
    const id = Math.floor((Math.random() * 1000)).toString();
    this.me = {
      id,
      name: 'User' + id,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
    };
  }),

  openModal: action(function (modalContent) {
    this.modal = {
      type: modalContent.type,
      title: modalContent.title,
      msg: modalContent.msg
    };
    if (modalContent.list) {
      this.modal.list = modalContent.list.map(function (item) {
        return item;
      });
    }
    this.modal.func = modalContent.func;
  }),

  submitModal(val) {
    const modal = this.modal;
    if (modal.get('msg')) modal.func(val, modal.get('msg'));
    else modal.func(val);
    setTimeout(() => { this.closeModal(); }, 1);
  },

  closeModal: action(function () {
    this.modal = undefined;
  }),

  // Chat
  getLanguages: action(function (langs) {
    langs.forEach(
      (item) => {
        this.translateLanguages.push({
          c: item.c,
          l: item.l
        });
      });
  }),
  send(msg, success) {
    const message = {
      id: (Date.now() / 1000 | 0),
      name: this.me.get('name'),
      avatar: this.me.get('avatar'),
      msg: msg.txt,
      time: Date.now() / 1000 | 0,
      sender: this.me.get('id')
    };

    socket.emit('some-chat-room', message);
    success();
  },
  addMessages: action(function (msgs) {
    this.messages = this.messages.concat(msgs);
  }),
  addMessage: action(function (msg) {
    this.messages.push(msg);
  })

});

const store = Store({
  modal: undefined
});

export default store;
