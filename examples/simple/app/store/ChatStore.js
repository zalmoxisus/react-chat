import { observable, action } from 'mobx';
import testMessages from '../testMessages';

export default class ChatStore {
  @observable messages = testMessages;
  @action send;
  @action remove;
}

