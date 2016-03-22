import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Contacts from '../../src/components/Contacts';

const props = {
  contactItem: {
    id: 1,
    name: 'John',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg'
  }
};

describe('Contacts', () => {
  it('should open edit name tooltip', () => {
    const wrapper = mount(<Contacts {...props} />);
    const editBtn = wrapper.find('#a' + props.contactItem.id);
    expect(wrapper.node.state.isTooltipActive).toBe(false);
    editBtn.find('svg').simulate('click');
    expect(wrapper.node.state.isTooltipActive).toBe(true);
  });

  it('should change name', () => {
    const wrapper = mount(<Contacts {...props} />);
    expect(wrapper.node.state.username).toBe('John');
    wrapper.node.editName('Johnny');
    expect(wrapper.node.state.username).toBe('Johnny');
  });
});
