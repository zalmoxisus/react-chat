import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Contacts from '../../src/components/Contacts';
import MenuLeft from '../../src/components/contacts/MenuLeft';
import MenuRight from '../../src/components/contacts/MenuRight';
import styles from '../../src/contactlist.scss';

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

describe('Contacts', () => {
  it('should toggle contact menus', () => {
    const wrapper = mount(<Contacts {...props} />);
    expect(wrapper.node.state.showMenu).toBe(false);
    expect(wrapper.find('img').hasClass(styles.smallImg)).toBe(true);
    expect(wrapper.find(MenuLeft).length).toBe(0);
    expect(wrapper.find(MenuRight).length).toBe(0);
    wrapper.find('.' + styles.arrow).simulate('click');
    expect(wrapper.node.state.showMenu).toBe(true);
    expect(wrapper.find('img').hasClass(styles.bigImg)).toBe(true);
    expect(wrapper.find(MenuLeft).length).toBe(1);
    expect(wrapper.find(MenuRight).length).toBe(1);
  });
});

describe('Contacts', () => {
  it('should display first letter of name if avatar is null', () => {
    const wrapper = mount(<Contacts {...props} />);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('span').length).toBe(2);
    props.contactItem.avatar = '';
    wrapper.update();
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('span').length).toBe(3);
    expect(wrapper.find('span').first().text()).toBe(props.contactItem.name[0]);
  });
});
