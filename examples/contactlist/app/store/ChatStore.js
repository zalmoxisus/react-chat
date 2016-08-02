import { observable, action } from 'mobx';

export default class ChatStore {
  @observable contactList = this.testContacts;

  @action deleteContact(contact, success) {
    this.contactList.remove(contact);
    success();
  }
}

