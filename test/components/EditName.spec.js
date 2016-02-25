import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import EditName from '../../src/components/EditName';
import styles from '../../src/contactlist.css';

const props = {
  name: 'John',
  onChangeName: (name, success) => {
    success();
  },
  editName: (name) => {
    //change state
  }
};

describeWithDOM('EditName', () => {
  it('should change name', () => {
    const wrapper = mount(<EditName {...props} />);
    wrapper
      .find('input')
      .simulate('keyPress', { nativeEvent: { keyCode: 13 }, target: { value: 'Johnny' } });
  });
});
