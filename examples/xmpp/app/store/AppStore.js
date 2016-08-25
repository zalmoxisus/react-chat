import { observable, action } from 'mobx';

export default class AppStore {
  @observable me = {};
  @observable modal = null;
  constructor(state) {
    if (state) this.importState(state);
  }

  @action importState(state) {
    Object.assign(this, state);
  }

  @action openModal = (modalContent) => {
    this.modal = modalContent;
  };
  @action closeModal = () => {
    this.modal = null;
  };
}
