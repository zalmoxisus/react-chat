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
  onMessage: expect.createSpy(),
  MsgStore: expect.createSpy()
};

describe('Messages. Chat.', () => {
  props.MsgStore = {
    messages: props.messages,

    addTodo: function(message) {
      props.messages.push(message);
    }
  };
  it('should add message', () => {
    props.onMessage = (msg, success) => {
      const message = {
        id: (Date.now() / 1000 | 0) + Math.random(),
        name: 'X',
        avatar: '',
        msg: props.text,
        time: Date.now() / 1000 | 0,
        sender: 1
      };

      props.MsgStore.addTodo(message);
      success();
    };

    Test(<Chat {...props} />)
      .find('textarea')
      .test(({textarea}) => {
        textarea.value = props.text;

        expect(props.messages.length).toBe(2);
        expect(textarea.value).toBe(props.text);

        props.onMessage({ txt: 'txt' }, function success() {
          textarea.value = '';
        });
        expect(props.messages.length).toBe(3);
        expect(props.messages[2].msg).toBe(props.text);
        expect(textarea.value).toBe('');
      });
  });
});
