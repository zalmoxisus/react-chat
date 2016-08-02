import { observable, action } from 'mobx';

export default class AppStore {
  @observable me = {
    id: '2',
    name: 'Leo',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
  };
  @observable modal = null;
  @action openModal = (modalContent) => {
    this.modal = modalContent;
  };
  @action closeModal = () => {
    this.modal = null;
  };
}
