import { observable, action } from 'mobx';

export default class AppStore {
  @observable modal = null;
  @action openModal = (modalContent) => {
    this.modal = modalContent;
  };
  @action closeModal = () => {
    this.modal = null;
  };
}
