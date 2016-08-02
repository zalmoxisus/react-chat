import { action } from 'mobx';

export default class ContactStore {
  @action deleteContact = (contact, success) => {
    console.log('delete method');
    success();
  }
}
