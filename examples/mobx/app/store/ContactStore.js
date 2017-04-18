import { observable, action, computed } from 'mobx';

export default class ContactStore {
  @action handleSend = (userId, msgId) => {
    // Add here message method
    console.log('handleMessage: ' + userId + '. msgId: ' + msgId);
  };
  @action handleCall = (userId, msgId) => {
    // Add here message method
    console.log('handleMessage: ' + userId + '. msgId: ' + msgId);
  };
  @action handleDelete = (userId, msgId, success) => {
    // Add here remove contact method
    console.log('delete method: ' + userId + '. msgId: ' + msgId);
    success();
  }
}
