import { observable, action } from 'mobx';

export default class ContactViewStore {
  @observable toolTipPosition = 'right';

  @action handleInfo = () => {
    // Add here info method
    console.log('info method');
  };

  @action handleMessage = () => {
    // Add here message method
    console.log('message method');
  };

  @action handleCall = () => {
    // Add here call method
    console.log('call method');
  };
}
