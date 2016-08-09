import { observable, action, computed } from 'mobx';

export default class ChatStore {
  @observable messages = [];
  @observable lang = 'en';
  @observable nativeLng = 'en';
  @observable withPhoto = true;
  @observable toolTipPosition = 'right';
  @observable translateLanguages = [];
  @observable menuShow = false;
  @observable emoticonShow = false;
  @observable voicesArr = [];

  constructor(state) {
    if (state) this.importState(state);
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action send(msg, success) {
    this.messages.push(msg);
    success();
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

  @computed get getVoices() {
    const selectedVoices = [];
    const voices = window.speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      let option = voices[i];
      if (option.lang.indexOf(this.lang) > -1) {
        selectedVoices.push(option);
      }
    }
    return selectedVoices;
  }

  @action addVoice() {
    this.voicesArr = this.getVoices;
  }
}
