import { observable, action } from 'mobx';

export default class ChatViewStore {
  @action translate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };
}
