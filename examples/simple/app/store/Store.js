import { createFactory, arrayOf, mapOf } from 'mobx-state-tree';
import { action } from 'mobx';
import testContacts from '../testContacts';

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

export const Contacts = createFactory({
  id: '',
  name: '',
  avatar: '',

  deleteContact: action(function (userId, msgId, success) {
    // Add here remove contact method
    console.log('delete method');
    success();
  }),

  handleInfo: action(function (userId, msgId) {
    // Add here info method
    console.log('info method');
  }),

  handleMessage: action(function (userId, msgId) {
    // Add here message method
    console.log('message method');
  }),

  handleCall: action(function (userId, msgId) {
    // Add here call method
    console.log('call method');
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

  // Contacts
  contactList: arrayOf(Contacts),

  // App
  getUserdata: action(function () {
    const id = Math.floor((Math.random() * 1000)).toString();
    this.me = {
      id: 12,
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

    this.addMessage(message);
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
  contactList: testContacts,
  modal: undefined
});

export default store;
