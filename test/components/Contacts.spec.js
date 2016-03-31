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
  it('should open edit name box', () => {
    const wrapper = mount(<Contacts {...props} />);
    expect(wrapper.node.state.showInpName).toBe(false);
    wrapper.node.showEdit();
    expect(wrapper.node.state.showInpName).toBe(true);
  });
});
