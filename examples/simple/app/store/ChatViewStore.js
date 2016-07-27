import { observable, action } from 'mobx';

export default class ChatViewStore {
  @observable menuShow = false;
  @action translate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };
  @action menu = (val) => {
    this.menuShow = val;
  };
}
