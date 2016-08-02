import { action } from 'mobx';

export default class ContactStore {
  @action deleteContact = (success) => {
    console.log('delete method');
    success();
  }
}
