import { observable, action } from 'mobx';

const randomId = Math.floor((Math.random() * 100)).toString();
export default class AppStore {
  @observable me = {
    id: randomId,
    name: `User ${randomId}`,
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
