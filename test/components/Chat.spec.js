import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import Test from 'legit-tests';
import hook from 'css-modules-require-hook';
import Chat from '../../src/Chat';

const props = {
  messages: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 2,
      name: 'Marry',
      avatar: '',
      msg: 'Welcome, John!',
      time: 1444428192,
      sender: 2
    }
  ],
  text: 'Hello',
  onMessage: (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: 'X',
      avatar: '',
      msg: props.text,
      time: Date.now() / 1000 | 0,
      sender: 1
    };
    props.messages.push(message);
    success();
  }
};

describe('Chat', () => {
  it('should add message', () => {
    Test(<Chat {...props} />)
      .find('textarea')
      .simulate({
        method: 'keyPress',
        element: 'textarea',
        options: {nativeEvent: {keyCode: 13}, target: {value: props.text}}
      })
      .test(({textarea}) => {
        expect(props.messages.length).toBe(3);
        expect(props.messages[2].msg).toBe(props.text);
        expect(textarea.value).toBe('');
      });
  });
});
