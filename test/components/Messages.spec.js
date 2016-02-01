import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import styles from '../../src/Chat.css';
import Message from '../../src/components/Message';

const props = {
  message:
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
  messages: [
    {
      id: 0,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    }
  ],
  me: { id: 2 },
  isMine: id => props.me.id === id,
  onTranslate: (txt, to, cb) => {
    cb(txt);
  },
  translateLanguages: [
    { c: 'sq', l: 'Albanian' },
    { c: 'ar', l: 'Arabic' }
  ],
  onDelete: (message, success) => {
    props.messages.forEach(function (item, index, object) {
      if (item.id === message) {
        object.splice(index, 1);
      }
    });
    success();
  }
};

describeWithDOM('Message', () => {
  it('should delete message', () => {
    const wrapper = mount(<Message {...props} />);
    expect(props.messages.length).toBe(2);
    wrapper.find('.' + styles.secondCell).find('div').at(2).simulate('click');
    expect(props.messages.length).toBe(1);
  });
});
