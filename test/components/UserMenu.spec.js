import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import styles from '../../src/Chat.css';
import UserMenu from '../../src/components/UserMenu';

const props = {
  messages: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    }
  ],
  text: 'https://www.youtube.com/watch?v=kuRn2S7iPNU',
  onMessage: (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: 'X',
      avatar: '',
      msg: props.text,
      time: Date.now() / 1000 | 0,
      sender: 1
    };
    props.messages.push(message);
    success();
  }
};

describeWithDOM('UserMenu.', () => {
  it('should render correctly', () => {
    const wrapper = mount(<UserMenu />).find('ul');
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.prop('className')).toBe(styles.usermenu);
    expect(wrapper.find('li').length).toBe(3);
  });
  it('should open video popup', () => {
    const wrapper = mount(<UserMenu />);
    wrapper.find('li').at(2).simulate('click');
    expect(wrapper.node.submenuShow).toBe(true);
  });
  it('should add message', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const container = wrapper.find('.' + styles.videoInpContainer);
    expect(container.node.children.length).toBe(2);
    wrapper.find('input').simulate('keyUp');
    expect(container.node.children.length).toBe(3);

    const videoInput = wrapper.find('input');
    expect(props.messages.length).toBe(1);
    videoInput.simulate('keyUp', {nativeEvent: {keyCode: 13}, target: {value: props.text}});
    expect(props.messages.length).toBe(2);
    expect(props.messages[1].msg).toBe(props.text);
  });
  it('should convert link to iframe', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const container = wrapper.find('.' + styles.videoInpContainer);
    const videoInput = wrapper.find('input');
    videoInput.simulate('keyUp', {target: {value: props.text}});
    expect(container.node.children[2].innerHTML).toBe('<iframe width="100%" height="150" src="//www.youtube.com/embed/kuRn2S7iPNU?autohide=1&amp;controls=2&amp;modestbranding=1&amp;rel=0&amp;showinfo=1&amp;playsinline=1&amp;autoplay=0" frameborder="0" allowfullscreen=""></iframe>');
  });
});