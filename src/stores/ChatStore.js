import { observable, action, computed } from 'mobx';

export default class ChatStore {
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable withPhoto = true;
  @observable menuShow = false;
  @observable emoticonShow = false;
  @observable inputValue = '';
  @observable voiceAccess = true;

  constructor(state) {
    if (state) this.importState(state);

    // Workaround for http://stackoverflow.com/q/22812303/4218591
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action translate(txt, to, cb) {
    // Add here your translation method
    cb(txt);
  }

  @action restore(message, success) {
    // Add here restore method
    success();
  }

  @action ban(id, success) {
    // Add here ban method
    success();
  }

  @action menu(val) {
    this.menuShow = val;
  }

  @action emoticon(val) {
    this.emoticonShow = val;
  }

  @action changeInpValue = (val) => {
    this.inputValue = val;
  };

  @computed get voices() {
    if (!window.speechSynthesis || !this.voiceAccess) return [];

    return window.speechSynthesis.getVoices()
      .filter(voice => voice.lang.indexOf(this.lang) > -1);
  }
}
