import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
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
      sender: '1'
    },
    {
      id: 2,
      name: 'Marry',
      avatar: '',
      msg: 'Welcome, John!',
      time: 1444428192,
      sender: '2'
    }
  ],
  text: 'Hello',
  onSend: (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: 'X',
      avatar: '',
      msg: props.text,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };
    props.messages.push(message);
    success();
  },
  me: { id: '2', name: 'Leo' }
};

describeWithDOM('Chat', () => {
  it('should add message', () => {
    const wrapper = mount(<Chat {...props} />)
      .find('textarea')
      .simulate('keyPress', { nativeEvent: { keyCode: 13 }, target: { value: props.text } });
    expect(props.messages.length).toBe(3);
    expect(props.messages[2].msg).toBe(props.text);
    expect(wrapper.text()).toEqual('');
  });
});