import { observable, action } from 'mobx';

export default class ContactViewStore {
  @observable toolTipPosition = 'right';

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
}
