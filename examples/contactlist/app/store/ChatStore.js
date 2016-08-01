import { observable, action } from 'mobx';
import testContacts from '../testContacts';

export default class ChatStore {
  @observable listContacts = testContacts;

  @action deleteContact(contact, success) {
    this.listContacts.remove(contact);
    success();
  }
}

