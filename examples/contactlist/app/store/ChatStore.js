import { observable, action } from 'mobx';

export default class ChatStore {
  @observable contactList;
  @observable toolTipPosition = 'right';

  @action deleteContact(contact, success) {
    this.contactList.remove(contact);
    success();
  }

  @action handleInfo = (contact) => {
    // Add here info method
    console.log('info method');
  };

  @action handleMessage = (contact) => {
    // Add here message method
    console.log('message method');
  };

  @action handleCall = (contact) => {
    // Add here call method
    console.log('call method');
  };

  @action static fromJS(testContacts) {
    const chatStore = new ChatStore();
    chatStore.contactList = testContacts;
    return chatStore;
  }
}

