import { observable, action } from 'mobx';

export default class AppStore {
  @observable me = {
    id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
  };
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
