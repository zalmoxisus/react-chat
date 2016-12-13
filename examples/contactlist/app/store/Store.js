import { createFactory, arrayOf, mapOf } from 'mobx-state-tree';
import { action } from 'mobx';
import testContacts from '../testContacts';

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

  deleteContact: action(function (contact) {
    // Add here remove contact method
    console.log('delete method');
    store.modal = undefined;
  }),

  handleInfo: action(function (contact) {
    // Add here info method
    console.log('info method');
  }),

  handleMessage: action(function (contact) {
    // Add here message method
    console.log('message method');
  }),

  handleCall: action(function (contact) {
    // Add here call method
    console.log('call method');
  })
});

const Store = createFactory({
  // App
  modal: mapOf(Modal),
  contactList: arrayOf(Contacts),
  toolTipPosition: (process.env.ISMOBILE) ? undefined : 'right',

  openModal: action(function (modalContent) {
    this.modal = {
      type: modalContent.type,
      title: modalContent.title
    };
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
  })
});

const store = Store({
  contactList: testContacts,
  modal: undefined
});

export default store;
