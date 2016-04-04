import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MessageOptions from '../../src/components/messages/MessageOptions';

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
  onTranslate: (txt, to, cb) => {
    cb(txt);
  },
  translateLanguages: [
    { c: 'sq', l: 'Albanian' },
    { c: 'ar', l: 'Arabic' }
  ]
};

describe('Message', () => {
  it('should show translate tooltip', () => {
    const wrapper = mount(<MessageOptions {...props} />);
    expect(wrapper.node.state.isTooltipActive).toBe(false);
    wrapper.find('#a' + props.message.id).simulate('click');
    expect(wrapper.node.state.isTooltipActive).toBe(true);
    wrapper.find('#a' + props.message.id).simulate('click');
    expect(wrapper.node.state.isTooltipActive).toBe(false);
  });
});
