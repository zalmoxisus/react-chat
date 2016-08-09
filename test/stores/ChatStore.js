import expect from 'expect';
import { toJS } from 'mobx';
import ChatStore from '../../src/stores/ChatStore';
import testMessages from '../../examples/simple/app/testMessages';

describe('ChatStore', () => {
  it('should get empty array of voices', () => {
    const store = new ChatStore();
    expect(store.getVoices).toEqual([]);
  });

  it('should get voices', () => {
    const voices = [{ lang: 'en', name: 'hi' }];
    window.speechSynthesis = {
      getVoices: () => voices
    };
    const store = new ChatStore();
    expect(store.getVoices).toEqual(voices);
  });

  it('should add a message', () => {
    const store = new ChatStore();
    store.addMessage(testMessages[0]);

    expect(toJS(store.messages)).toEqual([testMessages[0]]);
  });

  it('should add messages', () => {
    const store = new ChatStore();
    store.addMessages(testMessages);

    expect(toJS(store.messages)).toEqual(testMessages);
  });
});
