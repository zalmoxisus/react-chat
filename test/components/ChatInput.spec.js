import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import Test from 'legit-tests';
import hook from 'css-modules-require-hook';
import ChatInput from '../../src/components/ChatInput';
import styles from '../../src/Chat.css';

const props = {
  onMessage: expect.createSpy(),
  text: 'hello'
};

describe('Messages. ChatInput.', () => {
  it('should render correctly', () => {
    Test(<ChatInput {...props} />)
      .find('textarea')
      .test(({textarea}) => {
        expect(textarea.type).toBe('textarea');
        expect(textarea.value).toEqual('');
        expect(textarea.className).toEqual(styles.usermsg);
      });
  });

  it('should send messages to parrent', () => {
    Test(<ChatInput {...props} />)
      .find('textarea')
      .simulate({method: 'keyPress', element: 'textarea', options: {nativeEvent: {keyCode: 1}, target: { value: props.text }}})
      .test(({textarea}) => {
        expect(props.onMessage.calls.length).toBe(0);
      })
      .simulate({method: 'keyPress', element: 'textarea', options: {nativeEvent: {keyCode: 13}, target: { value: '' }}})
      .test(({textarea}) => {
        expect(props.onMessage.calls.length).toBe(0);
      })
      .simulate({method: 'keyPress', element: 'textarea', options: {nativeEvent: {keyCode: 13}, target: { value: props.text }}})
      .test(({textarea}) => {
        expect(props.onMessage).toHaveBeenCalled();
        expect(props.onMessage.calls.length).toBe(1);
      });
  });
});
