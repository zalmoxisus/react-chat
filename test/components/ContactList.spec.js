import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import ContactList from '../../src/ContactList';
import styles from '../../src/contactlist.css';

const props = {
  listContacts: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg'
    },
    {
      id: 2,
      name: 'Marry',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg'
    },
    {
      id: 3,
      name: 'Hellen',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/fenbox/128.jpg'
    },
    {
      id: 4,
      name: 'Peter',
      avatar: ''
    }
  ]
};

describeWithDOM('ContactList', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ContactList {...props} />).find('ul');
    expect(wrapper.children().length).toBe(props.listContacts.length);
    wrapper.children().forEach(function (node, i) {
      expect(node.node.props.contactItem.avatar).toBe(props.listContacts[i].avatar);
    });
  });
});
