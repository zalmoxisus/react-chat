import { observable, action } from 'mobx';
import translateLanguages from '../translateLanguages';

export default class ChatViewStore {
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable withPhoto = true;
  @observable toolTipPosition = 'right';
  @observable translateLanguages = translateLanguages;
  @observable menuShow = false;
  @observable emoticonShow = false;
  @observable voicesArr = [];
  @action translate = (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  };
  @action restore = (message, success) => {
    // Add here restore method
    success();
  };
  @action ban = (id, success) => {
    // Add here ban method
    success();
  };
  @action menu = (val) => {
    this.menuShow = val;
  };
  @action emoticon = (val) => {
    this.emoticonShow = val;
  };
  @action addVoice(voice) {
    this.voicesArr.push(voice);
  }
}
