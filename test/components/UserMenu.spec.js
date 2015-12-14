import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import styles from '../../src/Chat.css';
import UserMenu from '../../src/components/UserMenu';

describeWithDOM('UserMenu.', () => {
  it('should render correctly', () => {
    const wrapper = mount(<UserMenu />).find('ul');
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.prop('className')).toBe(styles.usermenu);
    expect(wrapper.find('li').length).toBe(3);
  });
});