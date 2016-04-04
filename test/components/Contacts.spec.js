import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Contacts from '../../src/components/Contacts';

const props = {
  contactItem: {
    id: 1,
    name: 'John',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg'
  },
  onChangeName: (id, name, success) => {
    success();
  }
};

describe('Contacts', () => {
  it('should open edit name box', () => {
    const wrapper = mount(<Contacts {...props} />);
    expect(wrapper.node.state.showInpName).toBe(false);
    wrapper.node.showEdit();
    expect(wrapper.node.state.showInpName).toBe(true);
  });
});

describe('Contacts', () => {
  it('should change name', () => {
    const wrapper = mount(<Contacts {...props} />);
    wrapper.node.state.showInpName = true;
    wrapper.update();
    expect(wrapper.node.state.username).toBe('John');
    wrapper.find('input')
      .simulate('keyDown', { nativeEvent: { keyCode: 13 }, target: { value: 'Johnny' } });
    expect(wrapper.node.state.username).toBe('Johnny');
  });
});
