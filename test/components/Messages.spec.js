import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import styles from '../../src/chat.scss';
import Message from '../../src/components/messages/Message';

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
  me: { id: 2 },
  isMine: id => props.me.id === id,
  withPhoto: true
};

describe('Message', () => {
  it('should render message', () => {
    const wrapper = mount(<Message {...props} />);
    expect(wrapper.find('div').at(0).prop('className')).toBe(styles.msgBox);
    const parentDiv = wrapper.find('.' + styles.msgBox).children();
    expect(parentDiv.length).toBe(3);
    expect(wrapper.find('.' + styles.msgBox).childAt(0).prop('className')).toBe(styles.avatar);
  });
});
