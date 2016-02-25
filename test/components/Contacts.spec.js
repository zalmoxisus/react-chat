import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import Contacts from '../../src/components/Contacts';
import styles from '../../src/contactlist.css';

const props = {
  contactItem: {
    id: 1,
    name: 'John',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg'
  }
};

describeWithDOM('Contacts', () => {
  it('should open edit name tooltip', () => {
    const wrapper = mount(<Contacts {...props} />);
    const editBtn = wrapper.find('#a' + props.contactItem.id);
    expect(wrapper.node.state.isTooltipActive).toBe(false);
    editBtn.find('svg').simulate('click');
    expect(wrapper.node.state.isTooltipActive).toBe(true);
  });
});
