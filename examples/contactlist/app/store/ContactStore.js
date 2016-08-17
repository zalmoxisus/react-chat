import { observable, action } from 'mobx';
import remotedev from 'mobx-remotedev';

class ContactStore {
  @observable contactList;

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
    const contactStore = new ContactStore();
    contactStore.contactList = testContacts;
    return contactStore;
  }
}

export default remotedev(ContactStore);
