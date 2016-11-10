import { action, observable } from 'mobx';

export default class ContactStore {
  @observable toolTipPosition = 'right';

  @action deleteContact(userId, msgId, success) {
    console.log('delete method');
    success();
  }

  @action handleInfo(userId, msgId) {
    // Add here info method
    console.log('info method');
  }

  @action handleMessage(userId, msgId) {
    // Add here message method
    console.log('message method');
  }

  @action handleCall(userId, msgId) {
    // Add here call method
    console.log('call method');
  }
}
