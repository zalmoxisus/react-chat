import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import styles from '../../src/Chat.css';
import UserMenu from '../../src/components/UserMenu';
import ChatInput from '../../src/components/ChatInput';

let usermsgWrapper;
const props = {
  messages: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: '1'
    }
  ],
  text: 'https://www.youtube.com/watch?v=kuRn2S7iPNU',
  onSend: (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: 'X',
      avatar: '',
      msg: props.text,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };
    props.messages.push(message);
    success();
  },
  menuShow: false,
  addTranslation: (e) => {
    props.addStr(e);
    props.menuShow = true;
  },
  addStr: (e) => {
    let node = usermsgWrapper;
    node.value = e;
  },
  onTranslate: (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  },
  translateLanguages: [
    { c: 'sq', l: 'Albanian' },
    { c: 'ar', l: 'Arabic' }
  ]
};

describeWithDOM('UserMenu.', () => {
  it('should render correctly', () => {
    const wrapper = mount(<UserMenu />).find('ul');
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.prop('className')).toBe(styles.usermenu);
  });
  it('should open video popup', () => {
    const wrapper = mount(<UserMenu />);
    wrapper.find('.' + styles.liVideo).simulate('click');
    expect(wrapper.node.state.submenuShow).toBe(true);
  });
  it('should add message', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const container = wrapper.find('.' + styles.videoInpContainer);
    const videoInput = wrapper.find('input').at(0);
    expect(container.node.children.length).toBe(2);
    videoInput.simulate('keyUp');
    expect(container.node.children.length).toBe(3);

    expect(props.messages.length).toBe(1);
    videoInput.simulate('keyUp', { nativeEvent: { keyCode: 13 }, target: { value: props.text } });
    expect(props.messages.length).toBe(2);
    expect(props.messages[1].msg).toBe(props.text);
  });
  it('should convert link to iframe', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const container = wrapper.find('.' + styles.videoInpContainer);
    const videoInput = wrapper.find('input').at(0);
    videoInput.simulate('keyUp', { target: { value: props.text } });
    expect(container.node.children[2].innerHTML)
      .toBe('<iframe width="100%" height="150" ' +
        'src="//www.youtube.com/embed/kuRn2S7iPNU?autohide=1&amp;controls=2&amp;modestbranding=1&amp;rel=0&amp;showinfo=1&amp;playsinline=1&amp;autoplay=0" ' + // eslint-disable-line max-len
        'frameborder="0" allowfullscreen=""></iframe>');
  });
  it('should open translate popup', () => {
    const wrapper = mount(<UserMenu {...props} />);
    wrapper.find('.' + styles.liTranslate).simulate('click');
    expect(wrapper.node.state.submenuShow).toBe(true);
  });
  it('should add translation', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const container = wrapper.find('.' + styles.videoInpContainer);
    const translationInput = wrapper.find('input').at(1);
    usermsgWrapper = mount(<ChatInput />).find('textarea');
    expect(usermsgWrapper.value).toBe(undefined);
    translationInput.simulate('keyUp', { nativeEvent: { keyCode: 13 }, target: { value: 'hi' } });
    expect(props.menuShow).toBe(true);
    expect(usermsgWrapper.value).toNotBe(undefined);
  });
});