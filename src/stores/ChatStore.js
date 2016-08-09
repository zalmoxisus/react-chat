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

  constructor(state) {
    if (state) this.importState(state);

    // Workaround for http://stackoverflow.com/q/22812303/4218591
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action addMessage(msg) {
    this.messages.push(msg);
  }

  @action addMessages(msgs) {
    this.messages = this.messages.concat(msgs);
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

  @computed get voices() {
    if (!window.speechSynthesis) return [];

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
}
