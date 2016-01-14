import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import ChatArea from '../../src/components/ChatArea';
import styles from '../../src/Chat.css';

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
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/129.jpg',
      msg: 'Hello, John!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 3,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/130.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 4,
      name: 'Marry',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/131.jpg',
      msg: 'Hello, John!',
      time: 1444428192,
      sender: 1
    }
  ],
  me: { id: 2 },
  isMine: id => props.me.id === id
};

describeWithDOM('ChatArea', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ChatArea {...props} />).find('#container');
    expect(wrapper).toExist();
    expect(wrapper.type()).toBe('div');
    expect(wrapper.prop('className')).toBe(styles.container);
  });

  it('should render messages', () => {
    const wrapper = mount(<ChatArea {...props} />).find('#container');
    expect(wrapper.children().length).toBe(props.messages.length);
    wrapper.children().forEach(function (node, i) {
      expect(node.find('img').node.src).toBe(props.messages[i].avatar);
    });

  });
});
