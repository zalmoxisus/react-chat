import { action, observable } from 'mobx';

export default class ContactStore {
  @observable toolTipPosition = 'right';

  @action deleteContact(contact, success) {
    console.log('delete method');
    success();
  }

  @action handleInfo(contact) {
    // Add here info method
    console.log('info method');
  }

  @action handleMessage(contact) {
    // Add here message method
    console.log('message method');
  }

  @action handleCall(contact) {
    // Add here call method
    console.log('call method');
  }
}
