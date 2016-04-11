import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import styles from '../../src/chat.scss';
import Ban from '../../src/components/message/Ban';

let props = {
  message:
  {
    id: 1,
    name: 'John',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
    msg: 'Hello, Marry!',
    time: 1444428192,
    sender: 1
  },
  me: { id: 1 },
  isMine: id => props.me.id === id,
  withPhoto: true
};

describe('Ban', () => {
  it('should render ban component for my message', () => {
    const wrapper = mount(<Ban {...props} />);
    expect(wrapper.find('div').at(0).prop('className')).toBe(styles.restoreMsg);
    const parentDiv = wrapper.find('div').at(0);
    expect(parentDiv.children().length).toBe(2);
  });
  it('should render ban component for user message', () => {
    props.me.id = 2;
    const wrapper = mount(<Ban {...props} />);
    expect(wrapper.find('div').at(0).prop('className')).toBe(styles.restoreMsg);
    const parentDiv = wrapper.find('div').at(0);
    expect(parentDiv.children().length).toBe(3);
  });
});
